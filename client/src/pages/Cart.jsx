import React from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FormControl,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { add, remove } from "../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // const { cartItems } = useSelector((state) => state.cart);
  const addToCartHandler = (producto, qty) => {
    dispatch(add({ ...producto, qty }));
  };
  const removeHandler = (id) => {
    dispatch(remove(id));
  };
  //if we are not logged in it will redirect us to login ,otherwise it will go to shipping
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <div className="py-3">
      <Container className="effect">
        <div style={{ margin: ".7rem 0 1.7rem 0" }}>
          <h1 style={{ fontWeight: "200" }}>Shopping Cart</h1>
        </div>
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <Alert>Your cart in empty</Alert>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroupItem key={item._id}>
                    <Row>
                      <Col md={2}>
                        {/* Fluid makes it small */}
                        <Image src={item.image} alt={item.title} fluid />
                      </Col>
                      <Col md={4}>
                        <Link
                          to={`/details/${item._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {item.title}
                        </Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <FormControl
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item?.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                      <Col>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeHandler(item?._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card className="p-2">
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}) Items
                  </h2>
                  <h5>
                    $
                    {cartItems
                      .reduce((a, c) => a + c.qty * c.price, 0)
                      .toFixed(2)}
                  </h5>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    variant="success"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to Checkout
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
