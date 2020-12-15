import React, { useState } from 'react'
import {LibraryProvider} from './contexts/libraryContext'
import LibraryPage from './pages/LibraryPage/LibraryPage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import FullBook from './components/FullBook/FullBook'
import Navigation from './components/Navigation/Navigation'
import {Route, Redirect} from 'react-router-dom'
import './App.css';

function App() {

  return (
    <div className="app">
      <Navigation />
      <LibraryProvider>
        <Route path="/explore" component={ExplorePage} />
        <Route path="/library" component={LibraryPage} />
        <Route path="/fullbook/:isbn" component={FullBook} /> 
        <Redirect to="/explore" />
      </LibraryProvider>
    </div>
  )
}

export default App;
