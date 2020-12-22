import React from 'react'
import './Spinner.css'

function Spinner(props) {

    let className = 'lds-ring'
    if (props.theme === 'dark') {
        className = 'lds-ring-dark'
    }

    return (
        <div className={className}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Spinner