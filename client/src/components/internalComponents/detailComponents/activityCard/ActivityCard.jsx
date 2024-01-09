import React from "react";
import styles from "./ActivityCard.module.css";

export default function ActivityCard(props) {
  return (
    <div className={styles.container}>
      <div className={styles.container__name}>
        <h3>{props.name}</h3>
      </div>

      <div className={styles.container__cont}>
        <h3>Difficulty:</h3>
        <h3>{props.difficulty}</h3>
      </div>

      <div className={styles.container__cont}>
        <h3>Duration:</h3>
        <h3>{props.duration}</h3>
      </div>

      <div className={styles.container__cont}>
        <h3>Season:</h3>
        <h3>{props.season}</h3>
      </div>
    </div>
  );
}
