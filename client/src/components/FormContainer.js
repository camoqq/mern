import { Col, Container, Row } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container className="pt-3 effect">
      <Row className="">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
