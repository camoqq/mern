import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form } from "react-bootstrap";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <Row>
      <Col md={3}>
        <Form onSubmit={submitHandler}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type=""
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form>
      </Col>
      <Col md={9}>2</Col>
    </Row>
  );
};

export default Profile;
