import React, { useState } from 'react'
import {LibraryProvider} from './contexts/libraryContext'
import LibraryPage from './pages/LibraryPage/LibraryPage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import {NavLink, Route, Redirect} from 'react-router-dom'
import './App.css';

function App() {

  return (
    <div>
      <nav className="navigation-pages">
        <NavLink to="/library">Library</NavLink>
        <NavLink to="/explore">Explore</NavLink>
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
