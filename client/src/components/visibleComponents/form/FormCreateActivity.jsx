import styles from "./FormCreateActivity.module.css";
import React, { useEffect, useState } from "react";
import { newActivities } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import validations from "../../../utils/validations";
import SelectedCountry from "../../internalComponents/formComponents/selectedCoutry/SelectedCountry";

export default function FormCreateActivity({ countries }) {
  const dispatch = useDispatch();
  const { originalCountries } = useSelector((state) => state);

  const [newActivity, setNewActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    CountryID: [],
  });

  const [errors, setErrors] = useState({});
  const [countriesList, setcountriesList] = useState([]);
  const [selectCountries, setSelectCountries] = useState([]);
  const [countryID, setCountryID] = useState([]);

  const handlerActivities = (event) => {
    const { name, value } = event.target;
    setNewActivity({ ...newActivity, [name]: value });
    setErrors(validations({ ...newActivity, [name]: value }));
  };

  const handleDifficult = (event) => {
    const { value } = event.target;
    setNewActivity({ ...newActivity, difficulty: value });
    setErrors(validations({ ...newActivity, difficulty: value }));
  };
  const handleSeason = (event) => {
    const { value } = event.target;
    setNewActivity({ ...newActivity, season: value });
    setErrors(validations({ ...newActivity, season: value }));
  };

  const handlerSelectCountries = (event) => {
    const { value } = event.target;
    const buscado = originalCountries.find((elem) => elem.id === value);
    if (value !== "Seleccionar" && !selectCountries.includes(buscado.name)) {
      const filter = originalCountries.find((elem) => elem.id === value);
      setSelectCountries([...selectCountries, buscado.name]);
      setCountryID([...countryID, filter.id]);
    }
    if (selectCountries.includes(buscado.name)) {
      alert("this country is already selected");
    }
  };

  useEffect(() => {
    setNewActivity((prevState) => ({
      ...prevState,
      CountryID: countryID,
    }));
  }, [countryID]);

  const deleteCountry = (name) => {
    const countryDeselected = selectCountries.filter((count) => count !== name);
    const deleted = originalCountries.find((elem) => elem.name === name);
    const countryIDdelete = countryID.filter((elem) => elem !== deleted.id);
    setCountryID(countryIDdelete);
    setSelectCountries(countryDeselected);
  };

  const handlerSubmit = () => {
    dispatch(newActivities(newActivity));
    saveActivity(newActivity);
    setSelectCountries([]);
    setCountryID([]);
    setNewActivity({...newActivity,
      CountryID: [],
    });
  };

  const saveActivity = async (newActivity) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/activities/",
        newActivity
      );
      alert("Saved activity");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          window.alert("Error: Required data are missing"); //error al crear la actividad, faltan datos
        } else {
          window.alert(error.response.data.error); //error al crear la actividad, ya existe
        }
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error("No response received from the server");
      } else {
        // Algo sucedió en la configuración de la solicitud que provocó el error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesCopy = [...originalCountries];

        countriesCopy.sort((a, b) => a.name.localeCompare(b.name));

        const newOptions = countriesCopy.map((country) => ({
          value: country.id,
          label: country.name,
        }));

        setcountriesList(newOptions);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error.message);
      }
    };
    fetchData();
  }, [originalCountries]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container__form}>
          <div className={styles.container__form_hijo}>
            <div className={styles.container__form_label}>
              <label htmlFor="">Name</label>
            </div>
            <input
              type="text"
              name="name"
              value={newActivity.name}
              placeholder="type the name of the new activity"
              onChange={handlerActivities}
              className={styles.container__form_input}
            />
            <div className={styles.container__form_errors}>
              <p>{errors.name ? errors.name : null}</p>
            </div>
            <div className={styles.container__form_label}>
              <label htmlFor="">Difficulty</label>
            </div>
            <select
              name=""
              id=""
              onChange={handleDifficult}
              className={styles.container__form_input}
            >
              <option
                className={styles.container__form_input_option}
                value="Seleccionar"
              >
                Select difficulty{" "}
              </option>
              <option className={styles.container__form_input_option} value="1">
                Beginner{" "}
              </option>
              <option className={styles.container__form_input_option} value="2">
                Normal{" "}
              </option>
              <option className={styles.container__form_input_option} value="3">
                Intermediate{" "}
              </option>
              <option className={styles.container__form_input_option} value="4">
                Advanced{" "}
              </option>
              <option className={styles.container__form_input_option} value="5">
                Expert{" "}
              </option>
            </select>
            <div className={styles.container__form_errors}>
              <p>{errors.difficulty ? errors.difficulty : null}</p>
            </div>

            <div className={styles.container__form_label}>
              <label htmlFor="">Duration</label>
            </div>
            <input
              className={styles.container__form_input}
              type="text"
              name="duration"
              value={newActivity.duration}
              onChange={handlerActivities}
              placeholder="Time in HH:MM - Ex. 01:30"
            />
            <div className={styles.container__form_errors}>
              <p>{errors.duration ? errors.duration : null}</p>
            </div>

            <div className={styles.container__form_label}>
              <label htmlFor="">Season</label>
            </div>
            <select
              name=""
              id=""
              onChange={handleSeason}
              className={styles.container__form_input}
            >
              <option
                className={styles.container__form_input_option}
                value="Seleccionar"
              >
                Select Season
              </option>
              <option
                className={styles.container__form_input_option}
                value="Summer"
              >
                Summer{" "}
              </option>
              <option
                className={styles.container__form_input_option}
                value="Fall"
              >
                Fall{" "}
              </option>
              <option
                className={styles.container__form_input_option}
                value="Winter"
              >
                Winter{" "}
              </option>
              <option
                className={styles.container__form_input_option}
                value="Spring"
              >
                Spring{" "}
              </option>
            </select>
            <div className={styles.container__form_errors}>
              <p>{errors.season ? errors.season : null}</p>
            </div>
            <div className={styles.container__form_label}>
              <label htmlFor="">Countries</label>
            </div>
            <select
              onChange={handlerSelectCountries}
              className={styles.container__form_input}
            >
              <option
                className={styles.container__form_input_option}
                value="Seleccionar"
              >
                Seleccionar Pais{" "}
              </option>
              {countriesList.map((option) => (
                <option
                  className={styles.container__form_input_option}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
            <div className={styles.container__form_errors}>
              <p>
                {newActivity.name.length > 0 && selectCountries.length === 0
                  ? "Elija al menos 1 Pais"
                  : null}
              </p>
            </div>
            <div className={styles.container__form_button}>
              <button
                className={styles.container__form_button_button}
                onClick={handlerSubmit}
                disabled={
                  errors.name ||
                  errors.difficulty ||
                  errors.season ||
                  selectCountries.length < 1
                }
                type="submit"
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <div className={styles.container__form_countries}>
          {selectCountries.map((elem, indice) => (
            <SelectedCountry
              key={indice}
              name={elem}
              deleteCountry={deleteCountry}
            />
          ))}
        </div>
      </div>
    </>
  );
}
