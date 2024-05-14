import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import products from "../Products";
import Product from "../components/Product";
import { useGetProductosQuery } from "../slices/productsApiSlice";
// import axios from "axios";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductosQuery();

  // const [products, setproducts] = useState([]);

  // useEffect(() => {
  //   const insidef = async () => {
  //     //     const { data } = await axios.get("/api/products");
  //     const res = await fetch("/api/products");
  //     const data = await res.json();
  //     setproducts(data);
  //   };
  //   insidef();
  // }, []);
  return (
    <>
      <div className="py-3">
        {/* {isLoading ? () : error ? () : ()} */}
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <Alert>{error?.data?.message || error.error}</Alert>
        ) : (
          // <div>{error?.data?.message || error.error}</div>
          <Container>
            <div style={{ margin: ".7rem 0 1.7rem 0" }}>
              <a
                href="#prods"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h1>Latest Products</h1>
              </a>
            </div>
            <Row>
              <Col sm={8} className="col1 mb-4">
                <Image
                  fluid
                  rounded
                  src="https://a.storyblok.com/f/162306/6517x4345/79eb711de2/greggs-eco-shop-interior.jpg/m/1200x0/smart/filters:quality(95)"
                />
              </Col>
              <Col sm={4}>
                <p>
                  Eco-friendly products benefit you and the planet. They reduce
                  pollution, waste, and toxins, improving air and water quality.
                  Plus, they're often made from recycled materials and support
                  sustainable businesses. While some may be costlier upfront,
                  they can last longer and save you money in the long run.
                  Choosing eco-friendly products is an investment in your health
                  and the future of our planet. Start small and make a
                  difference!
                </p>
              </Col>
            </Row>
          </Container>
        )}
      </div>
      <Row style={{ padding: "0 1.5rem 3rem 1.5rem" }} id="prods">
        {/* add optional ? to products.map if map is undefined */}
        {products?.map((prod) => (
          <Col lg={3} md={6} sm={12} key={prod._id}>
            <Product prod={prod} />
          </Col>
        ))}
      </Row>
    </>

    // <div className="py-3">
    //   <Container>
    //     <h1>Latest Products</h1>
    //     <Row>
    //       {products.map((prod) => (
    //         <Col md={6} lg={4} key={prod._id}>
    //           <Product prod={prod} />
    //         </Col>
    //       ))}
    //     </Row>
    //   </Container>
    // </div>
  );
};

export default Home;
