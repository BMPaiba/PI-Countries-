import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./DetailCountry.module.css";
import ActivityCard from "../../internalComponents/detailComponents/activityCard/ActivityCard";
import { useSelector } from "react-redux";
import Loading from "../../internalComponents/homeComponents/loading/Loading";
const URL_API = import.meta.env.VITE_URL_API;
const URL = `${URL_API}/countries/`;

export default function DetailCountry() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [activities, setActivities] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setLoad(false);
      }, 500); 
    };
    fetchData();
  }, []); 

  const navigate = useNavigate();

  const comeback = () => {
    navigate("/home");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${URL}${id}`);

        if (data) {
          setDetail(data[0]);
          data.shift();
          data.map((elem) => {
            if (elem.difficulty === "1") {
              elem.difficulty = "Beginner";
            }
            if (elem.difficulty === "2") {
              elem.difficulty = "Normal";
            }
            if (elem.difficulty === "3") {
              elem.difficulty = "Intermediate";
            }
            if (elem.difficulty === "4") {
              elem.difficulty = "Advanced";
            }
            if (elem.difficulty === "5") {
              elem.difficulty = "Expert";
            }
          });
          setActivities(data);
        } else {
          alert("No existe el Pais buscado");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    load ? <Loading/> :
    <div>
      <div className={styles.container}>
        <div className={styles.container__cardMay}>
          <div className={styles.button}>
            <button onClick={comeback}>Back to Home</button>
          </div>
          <div className={styles.container__card}>
            <div className={styles.container__card_image}>
              <img src={detail?.image} alt={detail?.image} />
            </div>
            <div className={styles.container__card_info}>
              <div className={styles.container__card_info_data}>
                <div className={styles.container__card_info_name}>
                  <h2>{detail?.name}</h2>
                  <h2> ({detail?.id})</h2>
                </div>
                <div className={styles.container__card_info_dato}>
                  <h2>Continent:</h2>
                  <h2>{detail?.continent}</h2>
                </div>
                <div className={styles.container__card_info_dato}>
                  <h2>Capital:</h2>
                  <h2> {detail?.capital}</h2>
                </div>
                <div className={styles.container__card_info_dato}>
                  <h2>Sub-Region: </h2>
                  <h2> {detail?.subregion}</h2>
                </div>
                <div className={styles.container__card_info_dato}>
                  <h2>Area: </h2>
                  <h2> {detail?.area}</h2>
                </div>
                <div className={styles.container__card_info_dato}>
                  <h2>Population: </h2>
                  <h2> {detail?.population}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.activitiesMay}>
          <div className={styles.activities}>
            {activities.map((elem) => (
              <ActivityCard
                key={elem.id}
                name={elem.name}
                difficulty={elem.difficulty}
                duration={elem.duration}
                season={elem.season}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
