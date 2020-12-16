import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Drawer from './Drawer/Drawer'

import './Navigation.css'

function NavigationTablet(props) {
    return (
        <nav className="navigation">
            <Drawer />
            <div className="navigation__logo"></div>
            <SearchBar />
        </nav>
    )
}

export default NavigationTablet