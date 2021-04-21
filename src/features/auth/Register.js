import React from 'react';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Button } from 'bootstrap';

const Register = () => {
    return (
      <Container>
        <Form>
          <Row className="justify-content-center align">
            <Col sm={6}>
              <Form.Group controlId="email">
                <Form.Label>Почта</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm={6}>
              <Form.Group controlId="password">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm={6}>
              <Button variant="primary" type="submit">
                Войти
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )
}

export { Register };