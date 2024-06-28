import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Form,
  Container,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [profile] = useProfileMutation();

  useEffect(() => {
    //it will automtically display name and email in the boxes
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await profile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated sucessfully");
      } catch (err) {
        const errorMessage = err?.data?.message || err.error;
        toast.error(errorMessage);
      }
    }
  };

  //myorders
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  // console.log(orders?.isDelivered);

  return (
    <Container className="pt-3 effect">
      <Row>
        <Col md={3}>
          <h1
            style={{
              fontWeight: "200",
              margin: "2rem 0",
            }}
          >
            User Profile
          </h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type=""
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type=""
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password" className="my-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type=""
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="my-2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type=""
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="success" className="my-2">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <h1
                style={{
                  fontWeight: "200",

                  margin: "2rem 0",
                }}
              >
                My Orders
              </h1>
              <Table striped hover responsive className="table-sm">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>DATE</td>
                    <td>TOTAL</td>
                    {/* <td>PAID</td>
                    <td>DELIVERED</td> */}
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((x) => (
                    <tr key={x._id}>
                      <td>{x._id}</td>
                      <td>{x.createdAt.substring(0, 10)}</td>
                      <td>${String(x.totalPrice).substring(0, 5)}</td>
                      <td>
                        <LinkContainer to={`/order/${x._id}`}>
                          <Button className="btn-sm">Details</Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
