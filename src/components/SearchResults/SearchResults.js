import React from 'react'
import Spinner from '../Spinner'
import './SearchResults.css'

function SearchResults(props) {

    return (
        <>
            {props.loading ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    width: '100%',
                    background: '#2e2f33',
                    height: '100px',
                    top: 'calc(100% - 1px)',
                    left: 0
                }}>
                    <Spinner />
                </div>
            ) : (
                    <ul className="search-results">
                        {props.books.map((book, idx) => (
                            <li
                                className="search-results__item"
                                key={book.key}
                                onClick={() => props.onSelectBook(book)}>
                                {book.title} by {book.author_name}
                            </li>
                        ))}
                    </ul>
                )}
        </>
    )
}

export default SearchResults