import React, { useState, useEffect, useRef } from 'react'
import SearchResults from '../SearchResults/SearchResults'
import { useHistory } from 'react-router-dom'
import './SearchBar.css'

function SearchBar(props) {
    const [bookValue, setBookValue] = useState('')
    const [books, setBooks] = useState([])
    const [booksLoading, setBooksLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isBookSelected, setIsBookSelected] = useState(false)
    const timeoutId = useRef()
    const bookValueRef = useRef()
    const history = useHistory()

    useEffect(() => { //after input value is set
        bookValueRef.current = bookValue
        if (!isBookSelected) { //avoid to getBooks when selecting from searchResults
            clearTimeout(timeoutId.current)
            if (bookValue.length > 1) {
                timeoutId.current = setTimeout(() => { //debounce
                    getBooks()
                }, 100)
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
                    /*
                    SIMPLE EXPLANATION
                    The problem was that fetch could resolve unpredictably.
                    Say we have 3 call to getBooks()
                    The last could resolve BEFORE the first
                    So in order to avoid to reSet the state i make certain to check the books returned with the current (the latest) value of bookValue (checking title and author against a regular expression built with the latest value of bookValue)

                    Example: if getBooks() invoked with "tol" as bookValue resolves when the input is already "tolkien", and books of SearchResults are already "tolkien", is a bad user experience to reSet the state books with "tol", changing SearchResults

                    WHY am i using a ref instead of bookValue of state? 
                    Because when getBooks gets invoked it has a closure(that's important!) to the current (old) bookValue

                    WHY am i checking bookValueRef.length?
                    Because when i delete the input bar, one of the old fetch could resolve repopolating the searchResults
                    */
                    const regEx = new RegExp(bookValueRef.current, 'i')
                    if(
                        data.docs.some(doc => regEx.test(doc.title) || regEx.test(doc.author_name) ) &&
                        bookValueRef.current.length > 1
                    ) {
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
                        no state batching inside promise. There will be 3 different render
                        https://stackoverflow.com/questions/53048495/does-react-batch-state-update-functions-when-using-hooks
                        */
                        setBooks(books)
                        setBooksLoading(false)
                        setError(null)
                    }
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