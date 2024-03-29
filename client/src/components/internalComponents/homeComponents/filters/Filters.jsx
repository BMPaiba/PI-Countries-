import React, { useEffect, useState } from "react";
import styles from "./Filters.module.css";
import {
  paged,
  order,
  clear,
  allActivities,
  filters,
} from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FaFilter } from "react-icons/fa6";

export default function Filters() {
  const dispatch = useDispatch();
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [continentFilter, setContinentFilter] = useState("All");
  const [activityFilter, setActivityFilter] = useState("All");
  const URL_API = import.meta.env.VITE_URL_API;
  const URL_ACT = `${URL_API}/activities`;
  // const URL_ACT = "http://localhost:3001/activities";

  const handlerContinent = (event) => {
    const { value } = event.target;
    setContinentFilter(value);
  };

  const handleActivity = (event) => {
    const { value } = event.target;
    setActivityFilter(value);
  };

  useEffect(() => {
    const fetchData = () => {
      dispatch(filters(continentFilter, activityFilter));
      dispatch(paged(1));
    };
    fetchData();
  }, [continentFilter, activityFilter]);

  const handlerOrder = (event) => {
    dispatch(order(event.target.value));
    dispatch(paged(1));
  };

  const clearFilters = () => {
    dispatch(clear());
    dispatch(paged(1));
    setActivityFilter("All");
    setContinentFilter("All");
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

  const [showMenu, setShowMenu] = useState(window.innerWidth > 768);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.container__filter}>
        <FaFilter className={styles.btn_filter}  onClick={toggleMenu} />
      </div>
      {showMenu && (
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
            <h4>Sort By</h4>
          </div>
          <select name="order" onChange={handlerOrder}>
            <option value="select">Select</option>
            <option value="ascendant">Name (A - Z)</option>
            <option value="descending">Name (Z - A)</option>
            <option value="maximum">Poblation (Min - Max)</option>
            <option value="minimum">Poblation (Max - Min)</option>
          </select>
        </div>
        <div className={styles.container__cleanButton}>
          <button type="submit" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>)}
    </>
  );
}
