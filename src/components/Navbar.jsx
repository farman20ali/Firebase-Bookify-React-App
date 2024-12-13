import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const MyNavbar = () => {
  const firebase = useFirebase();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/book/list">Add Listing</Nav.Link>
          <Nav.Link as={Link} to="/book/orders">Orders</Nav.Link>
        </Nav>
        <Nav>
          {firebase.user? 
         ( <Nav.Link> {`Current User: ${firebase.user.email || ''}`}</Nav.Link>):
          (<Nav.Link as={Link} to="/login">Login</Nav.Link>)}
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <Nav.Link
            onClick={async () => {
              try {
                await firebase.handleLogout();
              } catch (error) {
                console.error("Logout failed:", error);
              }
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
