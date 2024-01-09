import React from "react";
import styles from "./SelectedCountry.module.css";

export default function SelectedCountry(props) {
  const delCountry = () => {
    console.log(props.name);
    props.deleteCountry(props.name);
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__name}>
        <h3>{props.name}</h3>
      </div>
      <div className={styles.container__close}>
        <button className={styles.container__close__button} onClick={delCountry}>❌</button>
      </div>
    </div>
  );
}
