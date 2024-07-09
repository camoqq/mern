import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress?.address, cart.paymentMethod, navigate]);

  // console.log(cart);

  const [createOrder, { error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Container className="pt-3 effect">
        <div style={{ margin: ".7rem 0 1.7rem 0" }}>
          <h1 style={{ fontWeight: "200" }}>Place Order</h1>
        </div>
        <CheckoutSteps step1 step2 step3 step4 />

        <div className="my-3">
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3 style={{ fontWeight: "350" }}> Shipping</h3>
                  <p>
                    <strong>Address:</strong>&nbsp;
                    {cart.shippingAddress?.address}, {cart.shippingAddress.city}
                    ,{cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.country}
                  </p>
                </ListGroupItem>
                <ListGroupItem>
                  <h3 style={{ fontWeight: "350" }}>Payment Method</h3>
                  <p>
                    <strong>Method:</strong>&nbsp;
                    {cart.paymentMethod}
                  </p>
                </ListGroupItem>
                {/* {console.log(cart)} */}
                <ListGroupItem>
                  <h3 style={{ fontWeight: "350" }}>Order Items</h3>
                  {cart.orderItems === 0 ? (
                    <Alert>Your cart is empty</Alert>
                  ) : (
                    <ListGroup variant="flush">
                      {cart.cartItems.map((item, index) => (
                        <ListGroupItem key={item._id}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.title}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              {/* <Link to={`/products/${item.product}`}> */}
                              {item.title}
                              {/* </Link> */}
                            </Col>
                            <Col md={4}>
                              {item.qty} x $ {item.price} = ${" "}
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h3 style={{ fontWeight: "350" }}>Order Summary</h3>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Items:</Col>
                      <Col>${cart.itemsPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Shipping:</Col>
                      <Col>${cart.shippingPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>${cart.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Total:</Col>
                      <Col>${cart.totalPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    {error && (
                      <Alert variant="danger">{error.data.message}</Alert>
                    )}
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button
                      type="button"
                      disabled={cart.cartItems.length === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default PlaceOrder;
