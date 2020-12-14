import React, { useState } from 'react'
import Dialog from '../../components/Dialog/Dialog'
import RadioGroup from '../../components/RadioGroup/RadioGroup'
import List from '../../components/List/List'
import { useDialog } from '../../hooks/useDialog'
import { useLibrary } from '../../contexts/libraryContext'

import './LibraryPage.css'

function LibraryPage(props) {
    const { isOpen, onToggleDialog } = useDialog()
    const { books } = useLibrary()

    let header = null;
    if (books.length) {
        header = (
            <header className="library-page__header">
                <span>{books.length} {books.length !== 1 ? 'books' : 'book'}</span>
                <button
                    className="library-page__sort"
                    onClick={onToggleDialog}>Sort by</button>
                <Dialog open={isOpen} onToggleDialog={onToggleDialog}>
                    <RadioGroup book={books[0] ? books[0] : {}} />
                </Dialog>
            </header>
        )
    }

    return (
        <div className="library-page">
            {header}
            <List books={books} />
        </div>
    )
}

export default LibraryPage