import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ prod }) => {
  return (
    <Card className="m-4 p-4 ">
      <a
        href={`/details/${prod._id}`}
        className="text-decoration-none text-dark"
      >
        <Card.Img src={prod.image} />
        <Card.Body>
          <Card.Title>{prod.title}</Card.Title>
          <Card.Text as="h4">${prod.price}</Card.Text>
          <Card.Text className="text-warning">
            <Rating value={prod.rating} />
          </Card.Text>
          <Card.Text className="m-0">{prod.numReviews} reviews</Card.Text>
        </Card.Body>
      </a>
    </Card>
  );
};

export default Product;
