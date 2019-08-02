import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class CustomNavbar extends React.Component {
  render() {
    return (
      <header>
        <Navbar expand="lg" className="mb-5">
          <Navbar.Brand href="http://127.0.0.1:8000/frontend/" className="mt-2">Your Future Best Worker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="http://127.0.0.1:8000/frontend/">Home</Nav.Link>
              <Nav.Link href="http://127.0.0.1:8000/candidates/">Link</Nav.Link>
              <Nav.Link href="http://127.0.0.1:8000/candidates/skills">Form</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}

export default CustomNavbar;


