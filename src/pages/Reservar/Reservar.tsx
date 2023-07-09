import React from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";

import { format } from "date-fns";
import { createReserva } from "../../services/reservas/reserva.service";
import { AxiosError } from "axios";

const emptyReserva = {
  reserva: "",
  nombre: "",
  apellido: "",
  cedula: "",
  email: "",
  date: new Date(),
  start: "08:00",
  end: "22:00",
};

export type ReservaBody = {
  reserva: string;
  nombre: string;
  apellido: string;
  cedula: string;
  date: Date;
  start: string;
  end: string;
};
const generateTimeOptions = () => {
  const options = [];
  const startTime = 8 * 60; // Start time in minutes (9:00 -> 9 * 60)
  const endTime = 22 * 60; // End time in minutes (21:00 -> 21 * 60)
  const interval = 30; // Time interval in minutes (30 minutes)

  for (let i = startTime; i <= endTime; i += interval) {
    const hours = Math.floor(i / 60);
    const minutes = i % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
    options.push(
      <option key={i} value={formattedTime}>
        {formattedTime}
      </option>
    );
  }

  return options;
};

const Reservar = () => {
  const [reserva, setReserva] = useState(emptyReserva);
  const [message, setMessage] = useState<string | undefined>("");
  const [status, setStatus] = useState<number | undefined>(0);
  const handleReservaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };
  const handleReservaSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };
  const submitReserva = async () => {
    try {
      const { status } = await createReserva(reserva);
      setStatus(status);
      setMessage("Reserva agendada !");
    } catch (error) {
      const err = error as AxiosError<any>;
      if (typeof err?.response?.message !== "object") {
        setStatus(err.status);
        setMessage(err?.response?.data?.message);
      } else {
        setStatus(err.status);
        setMessage("Complete todos los campos.");
      }

      console.log(err);
    }
  };
  console.log(status);
  return (
    <Container>
      <Row>
        <Col>
          <Form action="">
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Reserva *</Form.Label>
              <Form.Control
                type="text"
                value={reserva.reserva}
                onChange={handleReservaChange}
                name="reserva"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                value={reserva.nombre}
                onChange={handleReservaChange}
                name="nombre"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido *</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={reserva.apellido}
                onChange={handleReservaChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo institucional (fiuna.edu.py) *</Form.Label>
              <Form.Control
                type="email"
                value={reserva.email}
                onChange={handleReservaChange}
                name="email"
              />
            </Form.Group>
            <Row>
              <Form.Group as={Col} className="mb-3 col-12">
                <Form.Label>Fecha de Reserva *</Form.Label>
                <Form.Control
                  type="date"
                  min={format(reserva.date, "yyyy-MM-dd")}
                  value={format(reserva.date, "yyyy-MM-dd")}
                  onChange={handleReservaChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3 col-6">
                <Form.Label>Inicio de Reserva *</Form.Label>
                <Form.Select
                  value={reserva.start}
                  name="start"
                  onChange={handleReservaSelectChange}
                >
                  {generateTimeOptions()}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="mb-3 col-6">
                <Form.Label>Fin de Reserva *</Form.Label>
                <Form.Select
                  value={reserva.end}
                  name="end"
                  onChange={handleReservaSelectChange}
                >
                  {generateTimeOptions()}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={submitReserva}
                >
                  Generar Reserva
                </Button>
              </Col>
            </Row>
            {message && (
              <Row className="my-3">
                <Col>
                  <Alert variant={`${status ? "success" : "danger"}`}>
                    {message}
                  </Alert>
                </Col>
              </Row>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Reservar;
