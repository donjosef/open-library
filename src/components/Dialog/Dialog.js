import React from 'react'
import './Dialog.css'

function Dialog(props) {
    let dialog = null
    let overlay = null

    if (props.open) {
        dialog = (
            <div className="dialog">
                <div className="dialog__header">
                    <div className="dialog__close" onClick={props.onToggleDialog}>X</div>
                </div>
                <div className="dialog__body">
                    {props.children}
                </div>
            </div>
        )

        overlay = (
            <div
                onClick={props.onToggleDialog}
                className="dialog-overlay"></div>
        )
    }

    return (
        <>
            {overlay}
            {dialog}
        </>
    )
}

export default Dialog