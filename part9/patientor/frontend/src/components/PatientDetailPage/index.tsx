import { Container, Typography } from "@mui/material"
import { Patient } from "../../types"

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
    </Container>
  )
}

export default PatientDetailPage