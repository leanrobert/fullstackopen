import { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState('')

  if (!props.show) {
    return null
  }

  const books = props.books.data.allBooks

  const genres = [...new Set(books.flatMap(book => book.genres))]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(book => filter !== '' ? book.genres.includes(filter) : book).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => (
          <button key={genre} value={genre} onClick={e => setFilter(e.target.value)}>{genre}</button>
        ))}
      </div>
    </div>
  )
}

export default Books