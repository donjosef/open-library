import React from 'react'
import { useLibrary } from '../../contexts/libraryContext'
import './RadioGroup.css'

function RadioGroup(props) {
    const { onSort } = useLibrary()

    const sortBook = {
        title: props.book.title,
        number_of_pages: props.book.number_of_pages
    }

    return (
        <form className="radio-group">
            {Object.keys(sortBook).map((bookKey, idx) => {
                return (
                    <div key={idx} className="radio-group__item">
                        <label htmlFor={bookKey}>
                            {bookKey[0].toUpperCase() + bookKey.slice(1)}
                        </label>
                        <input
                            className="radio-group__input"
                            id={bookKey}
                            name="sort"
                            type="radio"
                            value={bookKey}
                            onChange={(e) => onSort(e.target.value)} />
                    </div>
                )
            })}
        </form>
    )
}

export default RadioGroup