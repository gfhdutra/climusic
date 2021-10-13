import { useRouter } from 'next/dist/client/router'
import { Navbar, Container, NavbarBrand, Nav } from 'react-bootstrap'
import styles from './styles.module.css'


export default function Header() {
  const router = useRouter()

  return (
    <Navbar className={styles.navbar} bg="dark" expand="sm" variant="dark">
      <Container>
        <NavbarBrand href="/">CliMusic</NavbarBrand>
        <Navbar.Toggle className={styles.button} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.nav}>
            <Nav.Link 
            className={router.pathname == "/" ? "active" : ""} href="/">Home</Nav.Link>
            <Nav.Link 
            className={router.pathname == "/playlists" ? "active" : ""} 
            href="/playlists">Playlists</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
