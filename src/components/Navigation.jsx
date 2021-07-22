import React, { useState } from "react";
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
  const [searchTermNav, setSearchTermNav] = useState("");
  const [searchButtonNavDisabled, setSearchButtonNavDisabled] = useState(true);

  const handleNavSearchInput = e => {
    setSearchTermNav(e.target.value);
    if (String(e.target.value).trim().length > 0) {
      setSearchButtonNavDisabled(false);
    } else {
      setSearchButtonNavDisabled(true);
    }
  };

  const handleSubmitClick = () => {
    setSearchTermNav(String(searchTermNav).trim());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      {/* "Link" in brand component since just redirect is needed */}
      <Navbar.Brand as={Link} to="/">
        <img src="./images/applogo.png" alt="Movies Unlimited Logo" />
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
            placeholder="Search Movies..."
            className="mr-sm-2"
            value={searchTermNav}
            onChange={handleNavSearchInput}
          />
          <Link
            to={{
              pathname: "/search",
              searchTerm: searchTermNav
            }}
          >
            <Button
              type="submit"
              variant={searchButtonNavDisabled ? "danger" : "success"}
              disabled={searchButtonNavDisabled}
              onClick={handleSubmitClick}
            >
              Search
            </Button>
          </Link>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
