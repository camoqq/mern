import React, { useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
// import products from "../Products";
import Rating from "../components/Rating";
import axios from "axios";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { add } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

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

  const { prodId: productId } = useParams();
  const { data: item, isLoading, error } = useGetProductDetailsQuery(productId);
  const [qty, setqty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartHandler = () => {
    dispatch(add({ ...item, qty }));
    navigate("/cart");
  };
  return (
    <div className="py-3">
      <Container className="effect">
        <h1>Details</h1>

        {isLoading ? (
          <div>Loading</div>
        ) : error ? (
          <div>{error.error}</div>
        ) : (
          //ROWS HAVE A LENGTH OF 12 , md={3}+md={5}+md={4} = 12
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
                  {item?.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          {console.log([...Array(item?.countInStock).keys()])}
                          <FormControl
                            as="select"
                            value={qty}
                            onChange={(e) => setqty(Number(e.target.value))}
                          >
                            {[...Array(item?.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      type="button"
                      disabled={item?.countInStock === 0}
                      variant="success"
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Details;
