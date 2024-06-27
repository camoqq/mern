import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import {
  Alert,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Loader,
  Spinner,
  Container,
} from "react-bootstrap";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);
  console.log(order);

  return (
    <Container className="pt-3 effect">
      <div style={{ margin: ".7rem 0 1.7rem 0" }}>
        <h1 style={{ fontWeight: "200", display: "inline" }}>Order </h1>
      </div>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Alert variant="danger">Order not Found</Alert>
      ) : (
        <>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.user.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  <p>
                    {/* {order.isDelivered ? (
                      <Alert variant="sucess">
                        Delivered on {order.deliveredAt}
                      </Alert>
                    ) : (
                      <Alert variant="danger">Not Delivered</Alert>
                    )} */}
                    <Alert variant="primary">Delivered</Alert>
                  </p>
                </ListGroupItem>
                <ListGroupItem>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                  </p>
                  {/* {order.isPaid ? (
                    <Alert variant="sucess">Paid on {order.deliveredAt}</Alert>
                  ) : (
                    <Alert variant="danger">Not Paid</Alert>
                  )} */}
                  <Alert variant="primary">Paid</Alert>
                </ListGroupItem>
                <ListGroupItem>
                  <h2>Order Items</h2>
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem>
                      <Row>
                        <Col m={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>{item.title}</Col>
                        <Col>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h2>Order Summary</h2>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
  {
  }
};

export default Order;
