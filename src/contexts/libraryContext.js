import React, { useState, useEffect } from 'react'

const LibraryContext = React.createContext()

export const LibraryProvider = (props) => {
  const [libraryBooks, setLibraryBooks] = useState([])
  const [sort, setSort] = useState('')

  useEffect(() => {
    if (sort) {
      const sortedBooks = [...libraryBooks].sort((a, b) => {
        if (a[sort] > b[sort]) {
          return 1
        } else {
          return -1
        }
      })

      setLibraryBooks(sortedBooks)
    }
  }, [sort])

  const handleAddBook = (book) => {
    setLibraryBooks(libraryBooks.concat(book))
  }

  const handleRemoveBook = (book) => {
    setLibraryBooks(libraryBooks.filter(libraryBook => libraryBook.key !== book.key))
  }

  const handleSort = (sort) => {
    setSort(sort)
  }

  return (
    <LibraryContext.Provider
      value={{
        books: libraryBooks,
        onAddBook: handleAddBook,
        onRemoveBook: handleRemoveBook,
        onSort: handleSort
      }}>
      {props.children}
    </LibraryContext.Provider>
  )
}

export const useLibrary = () => {
  const context = React.useContext(LibraryContext)
  if (!context) {
    throw new Error('useLibrary must be used inside LibraryProvider')
  }

  return context;
}
