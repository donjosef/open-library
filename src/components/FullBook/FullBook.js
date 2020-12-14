import React, {useState} from 'react'
import Spinner from '../Spinner'
import Dialog from '../Dialog/Dialog'
import {useDialog} from '../../hooks/useDialog'
import {useLibrary} from '../../contexts/libraryContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import './FullBook.css'

const FullBook = React.memo(({ book }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [dialogContent, setDialogContent] = useState('')
    const { books: libraryBooks, onAddBook, onRemoveBook } = useLibrary()
    const { isOpen, onToggleDialog } = useDialog()

    const data = Object.keys(book) //book will be {ISBN:someisbn: {this is the object i want}}

    React.useEffect(() => { //every time book changes when user select a book from search results
        setImageLoaded(false)
    }, [book])

    const handleLoadImage = () => { //invoked when onLoad event triggers
        setImageLoaded(true)
    }

    const handleAdd = (book) => {
        const existingBook = libraryBooks.find(libBook => libBook.key === book[data].key)

        if (!existingBook) {
            onAddBook(book[data])
            onToggleDialog()
            setDialogContent('Book added to library')
        } else {
            onToggleDialog()
            setDialogContent('This book is already being added')
        }
    }

    const handleRemove = (book) => {
        const existingBook = libraryBooks.find(libBook => libBook.key === book[data].key)
        if (existingBook) {
            onRemoveBook(book[data])
            onToggleDialog()
            setDialogContent('Book removed from library')
        } else {
            onToggleDialog()
            setDialogContent('This book is not in your library')
        }

    }

    let src = 'https://via.placeholder.com/350?text=Cover+not+available'
    if (book[data].cover) {
        src = book[data].cover.medium
    }

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
                        alt={book[data].title}
                        onLoad={handleLoadImage} />
                </div>
                <div className="full-book__details">
                    <h2>{book[data].title}</h2>
                    <p>By: {book[data].authors[0].name}</p>
                    {book[data].number_of_pages && (
                        <p>Pages: {book[data].number_of_pages}</p>
                    )}
                    <p>Publisher: {book[data].publishers[0].name}</p>
                    <div className="full-book__controls">
                        <button onClick={() => handleAdd(book)} title="add to library">
                            <FontAwesomeIcon icon={faPlusSquare} size='2x' />
                        </button>
                        <button onClick={() => handleRemove(book)} title="remove from library">
                            <FontAwesomeIcon icon={faTrashAlt} size='2x' />
                        </button>
                        <Dialog
                            open={isOpen}
                            onToggleDialog={onToggleDialog}>{dialogContent}</Dialog>
                    </div>
                </div>
                <div className="full-book__url">
                    <a href={book[data].url} target="_blank" rel="noreferrer">View details</a>
                </div>
            </div>
        </>
    )
})

export default FullBook