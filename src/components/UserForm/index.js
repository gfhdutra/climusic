import { useAppContext } from "../../contexts/AppContext"
import { Form, FormControl, FormGroup, FormLabel, FormText, Container, Button } from "react-bootstrap"
import styles from './styles.module.css'


export default function UserForm() {
  const {
    submitCity,
    city,
    setCity,
    displayWidget,
    tempDisplay
  } = useAppContext()

  return (
    <>
      <Form className={styles.formContainer} onSubmit={submitCity}>
        <FormGroup className="mb-4" controlId="cityInput">
          <FormLabel>Aonde você mora?</FormLabel>
          <FormControl
            type="text"
            placeholder="Maceió, BR"
            required
            value={city}
            onChange={e => { setCity(e.target.value) }} />
          <FormText className="text-muted">
            Para maior precisão inclua a sigla do país
          </FormText>
        </FormGroup>
        <Button type="submit" variant="dark">Pesquisar</Button>
      </Form>

      {displayWidget ?
        <Container className={styles.infoContainer}>
          <span>{`Temperatura atual: ${tempDisplay}ºC`}</span>
        </Container>
        : ''}
    </>
  )
}
