import React from "react";
import styles from "./CountryCard.module.css";
import { Link } from "react-router-dom";

export default function CountryCard(props) {
  return (
    <div>
      <Link to={`/detail/${props.id}`} className={styles.link}>
        <div className={styles.container}>
          <div className={styles.container__info}>
            <div className={styles.container__info_name}>
              <h2>{props.name}</h2>
            </div>
            <div className={styles.container__info_cont}>
               <h3>{props.continent}</h3>
            </div>
          </div>
          <div className={styles.container__img}>
            <img
              className={styles.container__img_flag}
              src={props.image}
              alt={props.image}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
