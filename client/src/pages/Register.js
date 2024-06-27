import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation(); // same as console.log(window.location.search);
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";
  useEffect(() => {
    if (userInfo) {
      // if there is userInfo in localStorage then navigate
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (confirmpassword !== password) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <div style={{ margin: ".7rem 0 1.7rem 0" }}>
        <h1 style={{ fontWeight: "200" }}>Sing Up</h1>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="confirmpassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="success" className="mt-2">
          Register
        </Button>
        {isLoading && <Spinner />}
        <Row className="py-3">
          <Col>
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              style={{ color: "black" }}
            >
              Login
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Register;
