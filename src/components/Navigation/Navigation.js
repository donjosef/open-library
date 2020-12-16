import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import NavigationLinks from './NavigationLinks/NavigationLinks'
import './Navigation.css'

function Navigation(props) {
    return (
        <nav className="navigation">
            <div className="navigation__logo"></div>
            <NavigationLinks />
            <SearchBar />
        </nav>
    )
}

export default Navigation