import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Drawer from './Drawer/Drawer'

import './Navigation.css'

function NavigationMobile(props) {
    return (
        <nav className="navigation">
            <Drawer mobile/>
            <SearchBar />
        </nav>
    )
}

export default NavigationMobile