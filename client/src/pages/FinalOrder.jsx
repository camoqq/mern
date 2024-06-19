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
} from "react-bootstrap";

const FinalOrder = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);
  console.log(order);

  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <Alert variant="danger">Order not Found</Alert>
  ) : (
    <>
      <h1>Order {order?.orderId}</h1>
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
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                {order.isDelivered ? (
                  <Alert variant="sucess">
                    Delivered on {order.deliveredAt}
                  </Alert>
                ) : (
                  <Alert>Not Delivered</Alert>
                )}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>:Method</strong>
                {order.isPaid}
              </p>
              {order.isPaid ? (
                <Alert variant="sucess">Paid on {order.deliveredAt}</Alert>
              ) : (
                <Alert>Not Paid</Alert>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroupItem>
                  <Row>
                    <Col m={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.title}</Link>
                    </Col>
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
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FinalOrder;
