import { useEffect, useState } from 'react'
import { Diagnose, Entry } from '../../types'
import { getDiagnoses } from '../../services/diagnoses';

interface Props {
  entry?: Entry
}


const PatientEntriesDetails = ({ entry }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  useEffect(() => {
    getDiagnoses().then(res => setDiagnoses(res.filter((diag: Diagnose) => entry?.diagnosisCodes?.includes(diag.code))))
  }, [entry?.diagnosisCodes])

  return (
    <div>
      <p>{entry?.date} {entry?.description}</p>
      <ul>
        {entry?.diagnosisCodes?.map((diagnose, i) =>
          <li key={diagnose}>{diagnose} {diagnoses[i]?.name}</li>
        )}
      </ul>
    </div>
  )
}

export default PatientEntriesDetails