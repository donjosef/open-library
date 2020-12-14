import React, { useState } from 'react'
import {LibraryProvider} from './contexts/libraryContext'
import LibraryPage from './pages/LibraryPage/LibraryPage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import './App.css';

function App() {
  const [page, setPage] = useState('search')

  return (
    <div>
      <nav className="navigation-pages">
        <button
          className={page === 'library' ? 'active' : null}
          onClick={() => setPage('library')}>Library</button>
        <button
          className={page === 'search' ? 'active' : null}
          onClick={() => setPage('search')}>Search</button>
      </nav>
      <LibraryProvider>
        {page === 'search' ? <ExplorePage /> : null}
        {page === 'library' ? <LibraryPage /> : null}
      </LibraryProvider>
    </div>
  )
}

export default App;
