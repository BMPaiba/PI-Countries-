import React from "react";
import styles from "./Loading.module.css";

import gifLoading from "../../../../assets/load.gif";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.container__loading}>
        <img src={gifLoading} alt="" />
        <h1>LOADING</h1>
      </div>
    </div>
  );
}
