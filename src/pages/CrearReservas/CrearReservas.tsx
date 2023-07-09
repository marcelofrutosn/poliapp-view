import { format } from "date-fns";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const CrearReservas = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Reserva </Form.Label>
              <Form.Control type="text" name="reserva" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Intervalo </Form.Label>
              <Form.Control type="text" name="reserva" />
            </Form.Group>

            <Row>
              <Form.Group as={Col} className="mb-3 col-6">
                <Form.Label>Inicio de Reserva</Form.Label>
                <Form.Select>
                  <option>12:30</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="mb-3 col-6">
                <Form.Label>Fin de Reserva</Form.Label>
                <Form.Select>
                  <option>12:30</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end">
                <Button variant="primary" type="submit" className="w-100">
                  Generar Reserva
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearReservas;
