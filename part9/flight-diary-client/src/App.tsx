import { useEffect, useState } from 'react'
import { Entry } from './types';
import { createEntry, getEntries } from './notesServices';

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    getEntries().then(data => setEntries(data))
  }, [])

  const handleCreate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createEntry({ date, visibility, weather, comment }).then(data => {
      setEntries(entries.concat(data))
    })

    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={handleCreate}>
        date <input value={date} onChange={e => setDate(e.target.value)} /><br />
        visibility <input value={visibility} onChange={e => setVisibility(e.target.value)} /><br />
        weather <input value={weather} onChange={e => setWeather(e.target.value)} /><br />
        comment <input value={comment} onChange={e => setComment(e.target.value)} /><br />
        <button type='submit'>add</button>
      </form>
      <h3>Diary entries</h3>
      {entries.map(entry =>
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>weather: {entry.weather}</p>
          <p>visibility: {entry.visibility}</p>
        </div>
      )}
    </div>
  )
}

export default App