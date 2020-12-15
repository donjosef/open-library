import React, { useState, useEffect } from 'react'
import Spinner from '../Spinner'
import Dialog from '../Dialog/Dialog'
import { useDialog } from '../../hooks/useDialog'
import { useLibrary } from '../../contexts/libraryContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import './FullBook.css'

const FullBook = React.memo((props) => {
    const [fullBook, setFullBook] = useState({})
    const [imageLoaded, setImageLoaded] = useState(false)
    const [dialogContent, setDialogContent] = useState('')
    const { books: libraryBooks, onAddBook, onRemoveBook } = useLibrary()
    const { isOpen, onToggleDialog } = useDialog()

    const book = props.location.state //when user clicks on book of searchResults, navigate into this component with history.push() and extract the state of location passed in history. Thanks to this book variable i cn extract isbn and lccn useful for fetch

    useEffect(() => { //every time book changes when user select a book from search results
        const bibKeys = book.isbn ? 'ISBN' : 'LCCN'
        fetch(`https://openlibrary.org/api/books?bibkeys=${bibKeys}:${book.isbn || book.lccn}&format=json&jscmd=data`)
            .then(res => res.json())
            .then(fullBook => {
                const key = Object.keys(fullBook) 
                /*fullBook will be {
                    ISBN:someisbn: {
                        this is the object i want
                    }}*/
                setFullBook(fullBook[key])
            })
            .catch(err => alert(err))
    }, [book])

    useEffect(() => { //every time fullBook changes because of new fullBook fetched
        setImageLoaded(false)
    }, [fullBook])

    const handleLoadImage = () => { //invoked when onLoad event triggers
        setImageLoaded(true)
    }

    const handleAdd = (book) => {
        const existingBook = libraryBooks.find(libBook => libBook.key === book.key)

        if (!existingBook) {
            onAddBook(book)
            onToggleDialog()
            setDialogContent('Book added to library')
        } else {
            onToggleDialog()
            setDialogContent('This book is already being added')
        }
    }

    const handleRemove = (book) => {
        const existingBook = libraryBooks.find(libBook => libBook.key === book.key)
        if (existingBook) {
            onRemoveBook(book)
            onToggleDialog()
            setDialogContent('Book removed from library')
        } else {
            onToggleDialog()
            setDialogContent('This book is not in your library')
        }
    }

    let src = 'https://via.placeholder.com/350?text=Cover+not+available'
    if (fullBook.cover) {
        src = fullBook.cover.medium
    }

    if(!Object.keys(fullBook).length) { //when fullbook is empty
        return <Spinner />
    } else {
        return (
            <>
                {!imageLoaded && (
                    <div style={{
                        height: '50vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Spinner />
                    </div>
                )}
                <div
                    className="full-book"
                    style={{ display: imageLoaded ? 'flex' : 'none' }}>
                    <div className="full-book__img-container">
                        <img
                            src={src}
                            alt={fullBook.title}
                            onLoad={handleLoadImage} />
                    </div>
                    <div className="full-book__details">
                        <h2>{fullBook.title}</h2>
                        <p>By: {fullBook.authors[0].name}</p>
                        {fullBook.number_of_pages && (
                            <p>Pages: {fullBook.number_of_pages}</p>
                        )}
                        <p>Publisher: {fullBook.publishers[0].name}</p>
                        <div className="full-book__controls">
                            <button onClick={() => handleAdd(fullBook)} title="add to library">
                                <FontAwesomeIcon icon={faPlusSquare} size='2x' />
                            </button>
                            <button onClick={() => handleRemove(fullBook)} title="remove from library">
                                <FontAwesomeIcon icon={faTrashAlt} size='2x' />
                            </button>
                            <Dialog
                                open={isOpen}
                                onToggleDialog={onToggleDialog}>{dialogContent}</Dialog>
                        </div>
                    </div>
                    <div className="full-book__url">
                        <a href={fullBook.url} target="_blank" rel="noreferrer">View details</a>
                    </div>
                </div>
            </>
        )
    }
})

export default FullBook