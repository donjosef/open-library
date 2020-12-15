import React, { useState } from 'react'
import {LibraryProvider} from './contexts/libraryContext'
import LibraryPage from './pages/LibraryPage/LibraryPage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import {NavLink, Route, Redirect} from 'react-router-dom'
import './App.css';

function App() {

  return (
    <div className="app">
      <nav className="navigation">
        <div className="navigation__logo"></div>
        <div className="navigation__links">
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/library">Library</NavLink>
        </div>
      </nav>
      <LibraryProvider>
        <Route path="/explore" component={ExplorePage} />
        <Route path="/library" component={LibraryPage} />
        <Redirect to="/explore" />
      </LibraryProvider>
    </div>
  )
}

export default App;
