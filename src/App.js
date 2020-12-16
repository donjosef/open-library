import React from 'react'
import {LibraryProvider} from './contexts/libraryContext'
import LibraryPage from './pages/LibraryPage/LibraryPage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import FullBook from './components/FullBook/FullBook'
import Navigation from './components/Navigation/Navigation'
import NavigationTablet from './components/Navigation/NavigationTablet'
import NavigationMobile from './components/Navigation/NavigationMobile'
import { useMedia } from './hooks/useMedia'
import {Route, Redirect} from 'react-router-dom'
import './App.css';

function App() {
  const media = useMedia()

  return (
    <div className="app">
      {
      media === 'desktop' ? <Navigation /> :
      media === 'tablet' ? <NavigationTablet /> : 
      <NavigationMobile />
      }
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
