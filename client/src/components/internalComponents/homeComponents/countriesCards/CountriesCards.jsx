import React from "react";
import styles from "./CountriesCards.module.css";
import notFoundImage from "../../../../assets/notFoundImage.png";
import CountryCard from "../countryCard/CountryCard";
import { useSelector } from "react-redux";

export default function CountriesCards({ countries }) {
  const { currentPage, pageSize } = useSelector((state) => state);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedCountries = countries.slice(startIndex, endIndex);
  
  return (
    <div className={styles.card}>
      {countries.length > 0 ? (
        displayedCountries.map((elem) => (
          <CountryCard
            key={elem.id}
            id={elem.id}
            image={elem.image}
            name={elem.name}
            continent={elem.continent}
          />
        ))
      ) : (
        <div className={styles.card__text}>
          <p className={styles.card__text_name}>
            Oops! It looks like the country you are looking for is not on our
            list. Shall we try another word?
          </p>
          <img className={styles.card__text_img} src={notFoundImage} alt="not found" />
        </div>
      )}
    </div>
  );
}
