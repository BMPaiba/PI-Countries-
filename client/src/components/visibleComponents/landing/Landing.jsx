import React from "react";
import styles from "./Landing.module.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const login = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__form}>
        <div className={styles.container__form_text}>
          <h2>Explora cada rincón del mundo desde la comodidad de tu hogar</h2>
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

