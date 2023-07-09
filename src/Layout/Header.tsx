import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import logo from ".././assets/logo.png";
import { Link } from "react-router-dom";
type props = {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
};

const Header: React.FC<props> = ({ isLogged, login, logout }) => {
  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="dark"
      variant="dark"
      className="mb-3"
    >
      <Container>
        <Navbar.Brand style={{ width: "10%" }}>
          <Link to="">
            <img src={logo} style={{ width: "100%" }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="d-flex justify-content-between"
        >
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="">
              Calendario
            </Nav.Link>
            <Nav.Link as={Link} to="reservar">
              Reservar
            </Nav.Link>
            {isLogged && (
              <>
                <Nav.Link as={Link} to="pendientes">
                  Pendientes
                </Nav.Link>
                <Nav.Link as={Link} to="crear">
                  Crear Reservas
                </Nav.Link>
              </>
            )}
          </Nav>
          <Form>
            <Button
              color="primary"
              onClick={() => {
                isLogged ? logout() : login();
              }}
            >
              {isLogged ? "Cerrar Sesión" : "Iniciar Sesión"}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
