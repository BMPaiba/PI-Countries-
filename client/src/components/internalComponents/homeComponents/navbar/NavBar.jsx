import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { search } from "../../../../redux/actions";

export default function NavBar() {
  const [searched, setSearched] = useState("");
  const URL_SEA = "http://localhost:3001/countries/name?name=";
  const dispatch = useDispatch();

  const countrySearched = (event) => {
    const { value } = event.target;
    setSearched(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL_SEARCHBAR = URL_SEA + searched;
        const { data } = await axios.get(URL_SEARCHBAR);
        if (data) {
          dispatch(search(data));
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error.message);
        dispatch(search([]));
      }
    };
    fetchData();
  }, [searched]);

  return (
    <div className={styles.container}>
      <input
        type="search"
        value={searched}
        placeholder="Type the name of the country"
        onChange={countrySearched}
      />
  
      <Link to="/Form">
        <button type="submit">Create a New Activity</button>
      </Link>
    </div>
  );
}
