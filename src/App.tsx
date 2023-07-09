import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import Calendario from "./pages/Calendario/Calendario";
import Header from "./Layout/Header";
import Reservar from "./pages/Reservar/Reservar";
import Pendientes from "./pages/Pendientes/Pendientes";
import CrearReservas from "./pages/CrearReservas/CrearReservas";
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const login = () => {
    setIsLogged(true);
  };
  const logout = () => {
    setIsLogged(false);
  };
  return (
    <>
      <Header login={login} logout={logout} isLogged={isLogged} />
      <Container>
        <Card className="bg-white p-4">
          <Routes>
            <Route path="/" element={<Calendario />} />
            <Route path="reservar" element={<Reservar />} />
            <Route path="pendientes" element={<Pendientes />} />
            <Route path="crear" element={<CrearReservas />} />
          </Routes>
        </Card>
      </Container>
    </>
  );
}

export default App;
