import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
// import products from "../Products";
import Rating from "../components/Rating";
import axios from "axios";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

const Details = () => {
  // ------------data brought from backend file--------------
  // console.log(params._id);
  //no need to bring this if using the backend to bring the data
  // const item = products.find((x) => x._id === params.id);

  // -----------------------------data brought from database -------
  // const [item, setitem] = useState({});
  // const params = useParams();
  // useEffect(() => {
  //   const insideF = async () => {
  //     // const { data } = await axios.get(
  //     //   `http://localhost:5000/api/products/${params.prodId}` //id comes from router
  //     // );
  //     const res = await fetch(
  //       `http://localhost:5000/api/products/${params.prodId}` //id comes from router
  //     );
  //     const data = await res.json();
  //     setitem(data);
  //     console.log(data);
  //   };

  //   insideF();
  // }, [params.prodId]);

  const { id: productId } = useParams();
  const { data: item, isLoading, error } = useGetProductDetailsQuery(productId);

  return (
    <div className="py-3">
      <Container>
        <h1>Details</h1>
        {isLoading ? (
          <div>loaidn</div>
        ) : error ? (
          <div>{error?.data?.message || error.error}</div>
        ) : (
          <Row>
            <Col md={3}>
              <Image src={item?.image} alt={item?.title} fluid />
            </Col>
            <Col md={5}>
              <ListGroup variant="flush">
                <ListGroupItem>{item?.title}</ListGroupItem>
                <ListGroupItem>
                  <h4> ${item?.price}</h4>
                </ListGroupItem>
                <ListGroupItem className="text-warning">
                  <Rating value={item?.rating} />
                </ListGroupItem>
                <ListGroupItem>{item?.numReviews} reviews</ListGroupItem>
                <ListGroupItem>{item?.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup>
                  <ListGroupItem>Price: ${item?.price}</ListGroupItem>
                  <ListGroupItem>
                    Status:{" "}
                    {item?.countInStock > 0 ? "In Stock" : "Out of stock"}
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button
                      type="button"
                      disabled={item?.countInStock === 0}
                      variant="success"
                    >
                      Add to cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}

        <Row>
          <Col md={3}>
            <Image src={item?.image} alt={item?.title} fluid />
          </Col>
          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroupItem>{item?.title}</ListGroupItem>
              <ListGroupItem>
                <h4> ${item?.price}</h4>
              </ListGroupItem>
              <ListGroupItem className="text-warning">
                <Rating value={item?.rating} />
              </ListGroupItem>
              <ListGroupItem>{item?.numReviews} reviews</ListGroupItem>
              <ListGroupItem>{item?.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroupItem>Price: ${item?.price}</ListGroupItem>
                <ListGroupItem>
                  Status: {item?.countInStock > 0 ? "In Stock" : "Out of stock"}
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    type="button"
                    disabled={item?.countInStock === 0}
                    variant="success"
                  >
                    Add to cart
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

export default Details;
