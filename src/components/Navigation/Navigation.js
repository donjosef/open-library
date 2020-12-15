import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import {NavLink} from 'react-router-dom'
import './Navigation.css'

function Navigation(props) {
    return (
        <nav className="navigation">
            <div className="navigation__logo"></div>
            <div className="navigation__links">
                <NavLink to="/explore">Explore</NavLink>
                <NavLink to="/categories">Categories</NavLink>
                <NavLink to="/library">Library</NavLink>
            </div>
            <SearchBar />
        </nav>
    )
}

export default Navigation