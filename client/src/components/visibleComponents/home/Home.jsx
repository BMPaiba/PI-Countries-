import styles from "./Home.module.css";
import React from "react";

import PagingButtons from "../../internalComponents/homeComponents/pagingButtons/PagingButtons";
import Filters from "../../internalComponents/homeComponents/filters/Filters";
import NavBar from "../../internalComponents/homeComponents/navbar/NavBar";
import CountriesCards from "../../internalComponents/homeComponents/countriesCards/CountriesCards";

export default function Home({ countries }) {
  return (
    <div className={styles.container}>
      <div className={styles.container__navbar}>
        <NavBar></NavBar>
      </div>
      <div className={styles.container_body}>
        <div>
          <Filters className={styles.container_body_filter}> FILTERES</Filters>
        </div>
        <div>
          <CountriesCards
            className={styles.container_body_cards}
            countries={countries}
          />
        </div>
      </div>
      <div className={styles.container__paging}>
        <PagingButtons
          countries={countries}
        />
      </div>
    </div>
  );
}
