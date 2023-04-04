import { useEffect, useState } from 'react'
import { Diagnose, Entry } from '../../types'
import { getDiagnoses } from '../../services/diagnoses';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry?: Entry
}


const PatientEntriesDetails = ({ entry }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  useEffect(() => {
    getDiagnoses().then(res => setDiagnoses(res.filter((diag: Diagnose) => entry?.diagnosisCodes?.includes(diag.code))))
  }, [entry?.diagnosisCodes])

  switch(entry?.type) {
    case "HealthCheck":
      return (
        <div style={{ border: '1px solid black', padding: '0 5px' }}>
          <p>{entry?.date} <MedicalServicesIcon /> </p>
          <p>{entry?.description}</p>
          <FavoriteIcon style={entry.healthCheckRating === 0 ? { color: 'green' } : { color: 'yellow' } } />
          <ul>
            {entry?.diagnosisCodes?.map((diagnose, i) =>
              <li key={diagnose}>{diagnose} {diagnoses[i]?.name}</li>
            )}
          </ul>
          <p>diagnose by {entry.specialist}</p>
        </div>
      )
    case "Hospital":
      return (
        <div style={{ border: '1px solid black', padding: '0 5px' }}>
          <p>{entry?.date} <LocalHospitalIcon /> </p>
          <p>{entry?.description}</p>
          <FavoriteIcon style={entry.healthCheckRating === 0 ? { color: 'green' } : { color: 'yellow' } } />
          <ul>
            {entry?.diagnosisCodes?.map((diagnose, i) =>
              <li key={diagnose}>{diagnose} {diagnoses[i]?.name}</li>
            )}
          </ul>
          <p>diagnose by {entry.specialist}</p>
        </div>
      )
    case "OccupationalHealthcare":
      return (
        <div style={{ border: '1px solid black', padding: '0 5px' }}>
          <p>{entry?.date} <WorkIcon /> </p>
          <p>{entry?.description}</p>
          <ul>
            {entry?.diagnosisCodes?.map((diagnose, i) =>
              <li key={diagnose}>{diagnose} {diagnoses[i]?.name}</li>
            )}
          </ul>
          <p>diagnose by {entry.specialist}</p>
        </div>
      )
  }

  return null
}

export default PatientEntriesDetails