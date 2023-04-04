import { Container, Typography } from "@mui/material"
import { Patient } from "../../types"
import PatientEntriesDetails from "./PatientEntriesDetails";

interface Props {
  patient?: Patient
}

const PatientDetailPage = ({ patient }: Props) => {
  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: "0.5em" }}>
        {patient?.name} {patient?.gender === 'male' ? '♂' : '♀'}
      </Typography>
      <p>ssh: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>

      <Typography variant="h5">Entries</Typography>
      {patient?.entries.map(entry => (
        <PatientEntriesDetails key={entry.id} entry={entry} />
      ))}
    </Container>
  )
}

export default PatientDetailPage