import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  ButtonToolbar,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";

import DataTable, { TableColumn } from "react-data-table-component";

import {
  Reserva,
  getAllReservas,
  updateReserva,
} from "../../services/reservas/reserva.service";
import { format } from "date-fns";
import { AxiosError } from "axios";
const emptyReserva = {
  reserva: "",
  nombre: "",
  apellido: "",
  email: "",
  status: "",
  date: new Date(),
  start: "08:00",
  end: "22:00",
};
const Pendientes = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [reserva, setReserva] = useState<Reserva>(emptyReserva);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<any>(0);
  const getReservas = async () => {
    const { data, status } = await getAllReservas({ status: "" });
    setReservas(data);
  };
  const handleReservaSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };
  const procesarReserva = async () => {
    try {
      const { status } = await updateReserva(reserva);
      setStatus(status);
      setMessage("Reserva actualizada.");
      getReservas();
    } catch (error) {
      const err = error as AxiosError<any>;
      if (err?.response?.data) {
        if (typeof err.response.data?.message !== "object") {
          setStatus(err.status);
          setMessage(err?.response?.data.message);
        } else {
          setStatus(err.status);
          setMessage("Complete todos los campos.");
        }
      }
    }
  };
  const columns: TableColumn<Reserva>[] = [
    {
      name: "Reserva",
      selector: (row) => row.reserva,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
    },
    {
      name: "Apellido",
      selector: (row) => row.apellido,
    },
    {
      name: "Fecha",
      selector: (row) => format(new Date(row.start), "dd-MM-yyyy"),
    },
    {
      name: "Inicio",
      selector: (row) => format(new Date(row.start), "HH:mm"),
    },
    {
      name: "Fin",
      selector: (row) => format(new Date(row.end), "HH:mm"),
    },
    {
      name: "Estado",
      cell: (row) => (
        <Badge
          bg={
            row.status === "PENDIENTE"
              ? "info"
              : row.status === "APROBADO"
              ? "success"
              : "danger"
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: "Acciones",
      cell: (row, index) => (
        <Button
          onClick={() => {
            setOpen(true);
            setReserva({ ...reservas[index], status: "APROBADO" });
          }}
          disabled={row.status !== "PENDIENTE"}
          size="sm"
        >
          Procesar
        </Button>
      ),
    },
  ];
  useEffect(() => {
    getReservas();
  }, []);
  console.log(reserva);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <DataTable
              columns={columns}
              data={reservas}
              noDataComponent={<div>No hay reservas pendientes</div>}
            />
          </Col>
        </Row>
      </Container>
      <Modal
        show={open}
        onHide={() => {
          setOpen(false);
        }}
      >
        <Modal.Header closeButton>Procesar Reserva</Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Aprobar o Rechazar</Form.Label>
            <Form.Select
              value={reserva?.status}
              name="status"
              onChange={handleReservaSelectChange}
            >
              <option value="APROBADO">Aprobar</option>
              <option value="RECHAZADO">Rechazar</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {message && <Alert>asdads</Alert>}
          <ButtonToolbar>
            <Button className="mx-2" onClick={procesarReserva}>
              Guardar
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                setReserva(emptyReserva);
              }}
            >
              Cancelar
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Pendientes;
