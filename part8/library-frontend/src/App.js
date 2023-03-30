import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'
import Recommendations from './components/Recommendations'



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const me = useQuery(ME)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (authors.loading || books.loading) return <div>Loading...</div>

  return (
    <div>
      {!token ? <Login show={page === 'login'} setToken={setToken} setPage={setPage} /> : (
        <>
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>Logout</button>
          </div>

          <Authors show={page === 'authors'} authors={authors} />
          <Books show={page === 'books'} books={books} />
          <NewBook show={page === 'add'} />
          {page === 'recommend' && <Recommendations show={page === 'recommend'} me={me} />}
        </>
      )}
    </div>

  )
}

export default App
