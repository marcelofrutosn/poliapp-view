import React from "react";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import es from "date-fns/locale/es";

const locales = {
  "es-ES": es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  Reserva,
  getAllReservas,
} from "../../services/reservas/reserva.service";
const Calendario = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const getReservas = async () => {
    const { data, status } = await getAllReservas({ status: "APROBADO" });
    setReservas(
      data.map((reserva) => ({
        ...reserva,
        title: reserva.reserva,
        start: new Date(reserva.start),
        end: new Date(reserva.end),
      }))
    );
  };

  useEffect(() => {
    getReservas();
  }, []);

  return (
    <Container>
      <Row>
        <Col style={{ minHeight: "900px" }}>
          <Calendar
            defaultDate={new Date()}
            events={reservas}
            localizer={localizer}
            culture="es-ES"
            messages={{
              next: "Siguiente",
              previous: "Anterior",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Calendario;
