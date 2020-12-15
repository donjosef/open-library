import React, { useState, useEffect, useRef } from 'react'
import SearchResults from '../SearchResults/SearchResults'
import {useHistory} from 'react-router-dom'
import './SearchBar.css'

function SearchBar(props) {
    const [bookValue, setBookValue] = useState('')
    const [books, setBooks] = useState([])
    const [booksLoading, setBooksLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isBookSelected, setIsBookSelected] = useState(false)
    const timeoutId = useRef()
    const history = useHistory()


    useEffect(() => { //after input value is set
        if (!isBookSelected) { //avoid to getBooks when selecting from searchResults
            clearTimeout(timeoutId.current)
            if (bookValue.length > 1) {
                timeoutId.current = setTimeout(() => { //debounce
                    getBooks()
                }, 500)
            } else {
                setBooks([])
            }
        }

    }, [bookValue])

    const handleBookValue = (value) => {
        setBookValue(value)
        setIsBookSelected(false) //otherwise it will not getBooks anymore (in fact after being selected is true. See useEffect conditional)
    }

    const getBooks = () => {
        const formattedBook = bookValue.trim().replace(/\s/g, "+")

        setBooksLoading(true)
        fetch(`https://openlibrary.org/search.json?q=${formattedBook}&limit=10`)
            .then(res => res.json())
            .then(data => {
                if (data.docs.length) {
                    const books = data.docs
                        .filter(doc => doc.isbn || doc.lccn) //filter out doc without isbn or lccn. Will be important when user select a book from searchResults. In fact, if user would select a book without an isbn or lccn the response of handleSelectBook will be an empty object
                        .map(({ title, publisher, publish_year, author_name, key, isbn, lccn }) => {
                            return {
                                isbn: isbn ? isbn[0] : undefined,
                                lccn: lccn ? lccn[0] : undefined,
                                key: key,
                                title: title || 'unknown',
                                publisher: Array.isArray(publisher) ? publisher[0] : 'unknown',
                                publish_year: Array.isArray(publish_year) ? publish_year[0] : 'unknown',
                                author_name: Array.isArray(author_name) ? author_name[0] : 'unknown'
                            }
                        })
                    /* 
                    no state batching inside promise. There will be 2 different render
                    https://stackoverflow.com/questions/53048495/does-react-batch-state-update-functions-when-using-hooks
                    */
                    setBooks(books)
                    setBooksLoading(false)
                    setError(null)
                } else {
                    const error = new Error('No books found. Be more specific.')
                    throw error
                }
            })
            .catch(err => {
                setError(err.message)
                setBooksLoading(false)
                setBooks([])
            })
    }

    const handleSelectBook = (book) => {
        /*in this case is better to update state BEFORE the promise will resolve. React will BATCH state updates, as opposed to asyncronous block like 'then'
        */
        setBookValue(book.title + ' ' + book.author_name)
        setBooks([])
        setIsBookSelected(true)

        history.push({
            pathname: '/fullbook/' + book.isbn || book.lccn,
            state: {
                ...book
            }
        })
    }

    return (
        <form className="search-bar__form">
            <input
                type="search"
                className="search-bar__input"
                value={bookValue}
                placeholder="Search"
                onChange={(e) => handleBookValue(e.target.value)} />
            { error && <h3>{error}</h3>}
            {(books.length > 0 || booksLoading) && (
                <SearchResults
                    books={books}
                    onSelectBook={handleSelectBook}
                    loading={booksLoading} />
            )}
        </form>
    )
}

export default SearchBar