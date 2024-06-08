import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart?.shippingAddress?.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart?.shippingAddress?.address, cart.paymentMethod, navigate]);
  console.log(cart.shippingAddress?.address);
  return (
    <>
      <FormContainer className="pt-3 effect">
        <div style={{ margin: ".7rem 0 1.7rem 0" }}>
          <h1 style={{ fontWeight: "200" }}>Place Order</h1>
        </div>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col>
            <ListGroup>
              <ListGroupItem>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong>
                  {cart?.shippingAddress?.address}
                </p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          {/* <Col md={4}>col</Col> */}
        </Row>
      </FormContainer>
    </>
  );
};

export default PlaceOrder;
