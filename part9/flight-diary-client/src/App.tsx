import { useEffect, useState } from 'react'
import { Entry } from './types';
import { createEntry, getEntries } from './notesServices';

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    getEntries().then(data => setEntries(data))
  }, [])

  const handleCreate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await createEntry({ date, visibility, weather, comment })

    if(response.weather) {
      setEntries(entries.concat(response))
    } else {
      setNotification(response)
      setTimeout(() => {
        setNotification('')
      }, 3000)
    }

    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <div>
      <h3>Add new entry</h3>
      {notification && <p style={{ color: 'red' }}>{notification}</p>}
      <form onSubmit={handleCreate}>
        <b>Date</b> <input type='date' value={date} onChange={e => setDate(e.target.value)} /><br />
        <b>Visibility</b>
        <div>
          Great<input name='visibility' type='radio' value='great' checked onChange={e => setVisibility(e.target.value)} /><br />
          Good<input name='visibility' type='radio' value='good' checked onChange={e => setVisibility(e.target.value)} /><br />
          Ok<input name='visibility' type='radio' value='ok' checked onChange={e => setVisibility(e.target.value)} /><br />
          Poor<input name='visibility' type='radio' value='poor' checked onChange={e => setVisibility(e.target.value)} /><br />
        </div>
        <b>Weather</b>
        <div>
          Sunny<input name='weather' type='radio' value='sunny' onChange={e => setWeather(e.target.value)} /><br />
          Rainy<input name='weather' type='radio' value='rainy' onChange={e => setWeather(e.target.value)} /><br />
          Cloudy<input name='weather' type='radio' value='cloudy' onChange={e => setWeather(e.target.value)} /><br />
          Stormy<input name='weather' type='radio' value='stormy' onChange={e => setWeather(e.target.value)} /><br />
          Windy<input name='weather' type='radio' value='windy' onChange={e => setWeather(e.target.value)} /><br />
        </div>
        <b>Comment</b> <input value={comment} onChange={e => setComment(e.target.value)} /><br />
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