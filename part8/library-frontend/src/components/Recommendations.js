import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS } from '../queries'

const Recommendations = ({ me }) => {
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: me.data.me.favoriteGenre }
  })

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <b>{me.data?.me.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations