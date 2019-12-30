import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      {/* "Link" in brand component since just redirect is needed */}
      <Navbar.Brand as={Link} to="/">
        Movies Unlimited
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {/* "NavLink" here since "active" class styling is needed */}
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/" exact>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={NavLink} to="/discover">
            Discover
          </Nav.Link>
          <NavDropdown title="My Stuff" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/myfavorites">
              My Favorites
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/myratings">
              My Ratings
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search Movies"
            className="mr-sm-2"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
