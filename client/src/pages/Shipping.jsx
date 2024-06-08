import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddr } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddr?.address || "");
  const [city, setCity] = useState(shippingAddr?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddr?.postalCode || "");
  const [country, setCountry] = useState(shippingAddr?.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  useEffect(() => {
    if (!shippingAddr) {
      navigate("/shipping");
    }
  }, [shippingAddr, navigate]);

  return (
    <FormContainer>
      <div style={{ margin: ".7rem 0 1.7rem 0" }}>
        <h1 style={{ fontWeight: "200" }}>Shipping Address</h1>
      </div>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="city" className="my-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="country" className="my-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="secondary" className="mt-2">
          Continue
        </Button>{" "}
      </Form>
    </FormContainer>
  );
};

export default Shipping;
