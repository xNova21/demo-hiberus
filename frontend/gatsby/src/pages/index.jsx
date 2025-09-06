import { Link } from "gatsby";
import React from "react";
import "../css/index.css";
export default function Default() {
  return (
    <main>
      <h1>App de Notas con Gatsby y LoopBack4</h1>
      <p>
        Esta aplicación permite gestionar notas utilizando Gatsby para el frontend y LoopBack4 como backend. Puedes crear, visualizar, editar y eliminar notas de manera sencilla y rápida.
      </p>
      <Link to="/app/dashboard">Comenzar</Link>
    </main>
  );
}
