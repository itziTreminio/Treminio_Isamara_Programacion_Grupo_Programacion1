import React, { useState } from "react";
import { ref, push } from "firebase/database";
import db from "./firebase";
import "./App.css";

function App() {
  const [numero, setNumero] = useState("");
  const [texto, setTexto] = useState("");

  const [errorNumero, setErrorNumero] = useState("");
  const [errorTexto, setErrorTexto] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  // Cambia estos datos por los tuyos
  const nombre = "Isamara";
  const apellidos = "Treminio Castro";

  console.log(`${nombre} ${apellidos}`);

  const validarNumero = (valor) => {
    return /^[0-9]+$/.test(valor);
  };

  const handleAceptar = async () => {
    let valido = true;
    setErrorNumero("");
    setErrorTexto("");
    setMensajeExito("");

    if (!validarNumero(numero)) {
      setErrorNumero("Dato erróneo, ingrese un número");
      valido = false;
    }

    if (texto.trim().length < 5) {
      setErrorTexto("El texto debe tener mínimo 5 caracteres");
      valido = false;
    }

    if (!valido) return;

    try {
      const datosRef = ref(db, "TreminioCastro_Isamara");
      await push(datosRef, {
        numero: numero,
        texto: texto
      });

      setNumero("");
      setTexto("");
      setMensajeExito("Datos guardados correctamente");
    } catch (error) {
      setMensajeExito("Ocurrió un error al guardar los datos");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Proyecto 2 React + Firebase</h1>

      <div className="form-group">
        <label>Input 1 (solo números):</label>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          placeholder="Ingrese un número"
        />
        {errorNumero && <p className="error">{errorNumero}</p>}
      </div>

      <div className="form-group">
        <label>Input 2 (mínimo 5 caracteres):</label>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ingrese un texto"
        />
        {errorTexto && <p className="error">{errorTexto}</p>}
      </div>

      <button onClick={handleAceptar}>Aceptar</button>

      {mensajeExito && <p className="success">{mensajeExito}</p>}
    </div>
  );
}

export default App;