import React from 'react'
import { NavLink } from 'react-router-dom'

function NavigationLinks(props) {
    let linksClass = 'navigation__links'
    let linkClass = 'navigation__link'
    if(props.tablet) {
        linksClass = 'navigation__links--tablet' 
        linkClass = 'navigation__link--tablet'
    }

    return (
        <div className={linksClass}>
            <NavLink className={linkClass} to="/explore">Explore</NavLink>
            <NavLink className={linkClass} to="/categories">Categories</NavLink>
            <NavLink className={linkClass} to="/library">Library</NavLink>
        </div>
    )
}

export default NavigationLinks