import React from "react";
import styles from "./Landing.module.css";
import { Link, useNavigate } from "react-router-dom";
import image from "../../../assets/globe-36.gif";

export default function Landing() {
  const navigate = useNavigate();

  const login = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__form}>
        <div className={styles.container__form_text}>
          <h1>Henry PI: Countries</h1>
          <h2>by Brian Paiba</h2>
        </div>
        <div className={styles.container__form_button}>
          <button onClick={login} type="submit">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

// ¡Bienvenido a nuestra plataforma de descubrimiento de países!

// ¿Listo para comenzar tu aventura? Navega a través de nuestro sitio y sumérgete en la diversidad de nuestro extraordinario planeta.
