import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ prod }) => {
  return (
    <div style={{ margin: "3rem 1.5rem 0 1.5rem" }}>
      <Card
        className=" p-4 "
        style={{
          boxShadow: "2px 2px .5px #198754",
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
