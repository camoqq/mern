import React from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import LogoIcon from "../assets/logo.svg";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";

const Header = () => {
  //you can bring anything from the cartslice ex:state.itemsprice
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation(); //give any name

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); //unwraps the promise
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate("./login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        collapseOnSelect
        style={{ boxShadow: "0px 2px 5px rgb(168, 200, 168)" }}
      >
        <Container>
          {/* use either linkcontainer or navlink */}
          <div>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img src={LogoIcon} alt="" width="65" height="65" />
              </Navbar.Brand>
            </LinkContainer>

            <LinkContainer to="/" style={{ fontWeight: "200", color: "green" }}>
              <Navbar.Brand>ECO STORE</Navbar.Brand>
            </LinkContainer>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge>{cartItems.reduce((a, c) => a + c.qty, 0)}</Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">
                  <FaUser /> Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
