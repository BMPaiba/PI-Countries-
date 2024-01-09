import React, { useEffect, useState } from "react";
import styles from "./Filters.module.css";
import {
  paged,
  continent,
  order,
  population,
  clear,
  filterActivities,
  allActivities,
} from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Filters() {
  const dispatch = useDispatch();
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const URL_ACT = "http://localhost:3001/activities";

  const handlerContinent = (event) => {
    dispatch(continent(event.target.value));
    dispatch(paged(1));
  };
  const handlerOrder = (event) => {
    dispatch(order(event.target.value));
    dispatch(paged(1));
  };
  const handlePopulation = (event) => {
    dispatch(population(event.target.value));
    dispatch(paged(1));
  };
  const clearFilters = () => {
    dispatch(clear());
    dispatch(paged(1));
  };
  const handleActivity = (event) => {
    const { value } = event.target;
    dispatch(filterActivities(value));
    dispatch(paged(1));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(URL_ACT);
        if (data) {
          dispatch(allActivities(data));
        }
        const newOptions = data.map((activity) => ({
          value: activity.id,
          label: activity.name,
        }));
        setDropdownOptions(newOptions);
      } catch (error) {
        +console.error("Error al realizar la solicitud:", error.message);
      }
    };
    fetchData();
  }, [URL_ACT]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container__continent}>
          <div className={styles.container__continent_name}>
          <h4>Select by continent</h4>
          </div>
          <select name="continent" onChange={handlerContinent}>
            <option value="All">All Continents</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Antarctic">Antarctic</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <div className={styles.container__activities}>
          <div className={styles.container__continent_name}>
          <h4>Select by activity</h4>

          </div>
          <select onChange={handleActivity}>
            <option value="All">All Activities</option>
            {dropdownOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.container__alphabeticalOrder}>
          <div className={styles.container__continent_name}>
          <h4>Alphabetical order</h4>

          </div>
          <select name="order" onChange={handlerOrder}>
            <option value="A">a-z</option>
            <option value="D">z-a</option>
          </select>
        </div>

        <div className={styles.container__populationOrder}>
          
          <div className={styles.container__continent_name}>
          <h4>Population order</h4>
          </div>
          <select name="population" onChange={handlePopulation}>
            <option value="A">min-max</option>
            <option value="D">max-min</option>
          </select>
        </div>

        <div className={styles.container__cleanButton}>
          <button type="submit" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </>
  );
}
