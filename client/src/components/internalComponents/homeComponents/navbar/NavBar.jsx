import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { search } from "../../../../redux/actions";
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavBar() {
  const [searched, setSearched] = useState("");
  const URL_API = import.meta.env.VITE_URL_API;
  const URL_SEA = `${URL_API}/countries/name?name=`;
  // const URL_SEA = "http://localhost:3001/countries/name?name=";
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

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className={styles.container}>
        <input
          type="search"
          value={searched}
          placeholder="Type the name of the country"
          onChange={countrySearched}
        />
        <Link to="/Form">
          <button type="submit" id={styles.create}>
            Create a New Activity
          </button>
        </Link>
        <GiHamburgerMenu id={styles.menu} onClick={toggleMenu} />
      </div>
      <div className={menuOpen ? styles.contentOpen : styles.content}>
        <Link to="/Form">
          <h2>Create a New Activity</h2>
        </Link>
      </div>
    </>
  );
}
