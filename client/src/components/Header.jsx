import React from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import LogoIcon from "../assets/logo.svg";
const Header = () => {
  //you can bring anything from the cartslice ex:state.itemsprice
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <header>
      <Navbar bg="success" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* use either linkcontainer or navlink */}
          <div>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img src={LogoIcon} alt="" width="65" height="65" />
              </Navbar.Brand>
            </LinkContainer>

            <LinkContainer to="/">
              <Navbar.Brand>ECO STORE</Navbar.Brand>
            </LinkContainer>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">
                <FaShoppingCart />
                Cart
                {cartItems.length > 0 && (
                  <Badge>{cartItems.reduce((a, c) => a + c.qty, 0)}</Badge>
                )}
              </Nav.Link>
              <Nav.Link href="/login">
                <FaUser />
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
