import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class CustomNavbar extends React.Component {
  render() {
    return (
      <header>
        <Navbar expand="lg" className="mb-5">
          <Navbar.Brand href="#home" className="mt-2">Your Future Best Worker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <Nav.Link href="#form">Form</Nav.Link>
              <Nav.Link href="#other">Other</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}

export default CustomNavbar;


