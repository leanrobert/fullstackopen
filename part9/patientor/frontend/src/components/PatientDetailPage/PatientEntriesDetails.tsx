import { Entry } from '../../types'

interface Props {
  entry?: Entry
}


const PatientEntriesDetails = ({ entry }: Props) => {
  switch(entry?.type) {
    case "HealthCheck":
      return(
        <div>
          <p>{entry.date} {entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map(diagnose =>
              <li key={diagnose}>{diagnose}</li>
            )}
          </ul>
        </div>
      )
    case "Hospital":
      return(
        <div>
          <p>{entry.date} {entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map(diagnose =>
              <li key={diagnose}>{diagnose}</li>
            )}
          </ul>
        </div>
      )
    case "OccupationalHealthcare":
      return(
        <div>
          <p>{entry.date} {entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map(diagnose =>
              <li key={diagnose}>{diagnose}</li>
            )}
          </ul>
        </div>
      )
  }
  return (
    <div>PatientEntriesDetails</div>
  )
}

export default PatientEntriesDetails