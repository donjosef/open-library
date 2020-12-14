import React from 'react'
import './List.css'

const List = (props) => {

    return (
        <ul className="books">
            {props.books.map((book, idx) => {

                return (
                    <li className="book" key={idx}>
                        <h3>{book.title}</h3>
                        <div>
                            <p>By {book.authors[0].name}</p>
                            <p>Publisher: {book.publishers[0].name}</p>
                            <p>Published on: {book.publish_date}</p>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default List 