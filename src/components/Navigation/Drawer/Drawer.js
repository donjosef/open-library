import React, {useState} from 'react'
import NavigationLinks from '../NavigationLinks/NavigationLinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Drawer(props) {
    const [open, setOpen] = useState(false)

    let drawerClasses = ['drawer']

    if(open) {
        drawerClasses = ['drawer', 'open']
    }

    return (
        <div>
            <button 
                className="navigation__menu-btn" 
                onClick={() => setOpen(!open)}>
                    <FontAwesomeIcon icon={faBars}/>
            </button>
            <div className={drawerClasses.join(" ")}>
                {props.mobile && <div className="navigation__logo"></div>}
                <NavigationLinks tablet/>
            </div>
            {open && <div onClick={() => setOpen(!open)} className="drawer-overlay"></div>}
        </div>
    )
}

export default Drawer