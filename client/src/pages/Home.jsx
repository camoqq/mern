import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import products from "../Products";
import Product from "../components/Product";
import { useGetProductosQuery } from "../slices/productsApiSlice";
// import axios from "axios";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductosQuery();

  // const [products, setproducts] = useState([]);

  // useEffect(() => {
  //   const insidef = async () => {
  //     //     const { data } = await axios.get("http://localhost:5000/api/products");
  //     const res = await fetch("http://localhost:5000/api/products");
  //     const data = await res.json();
  //     setproducts(data);
  //   };
  //   insidef();
  // }, []);
  return (
    <div className="py-3">
      {/* {isLoading ? () : error ? () : ()} */}
      {isLoading ? (
        <div>Is Loading...</div>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <Container>
          <h1>Latest Products</h1>
          <Row>
            {/* add optional ? to products.map if map is undefined */}
            {products.map((prod) => (
              <Col md={6} lg={4} key={prod._id}>
                <Product prod={prod} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
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
