import React from "react";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { Alert, Carousel, Image, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  return isLoading ? (
    <Spinner />
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <Carousel pause="hover" className="carousel">
      {data.map((x) => (
        <Carousel.Item key={x._id}>
          <Link to={`/details/${x._id}`}>
            <Image src={x.image} fluid />
            <Carousel.Caption className="carousel-caption">
              <h4>{x.title}</h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
