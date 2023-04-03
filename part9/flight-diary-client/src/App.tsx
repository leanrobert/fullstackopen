import { useEffect, useState } from 'react'
import { Entry } from './types';
import { getEntries } from './notesServices';

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    getEntries().then(data => setEntries(data))
  }, [])

  return (
    <div>
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