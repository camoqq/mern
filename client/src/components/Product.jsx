import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ prod }) => {
  return (
    <div className="container1">
      <Card
        className=" p-4 card1"
        style={{
          boxShadow: "  1px 1px 11px 3px #a4a4a4",
        }}
      >
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
    </div>
  );
};

export default Product;
