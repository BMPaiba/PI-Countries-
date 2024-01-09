import React, { useState } from "react";
import styles from "./PagingButtons.module.css";
import { useDispatch, useSelector } from "react-redux";
import { paged } from "../../../../redux/actions";


export default function PagingButtons({ countries }) {
  const dispatch = useDispatch();

  const { currentPage, pageSize } = useSelector((state) => state);

  const numberPages = Math.ceil(countries.length / pageSize);


  const handleNextChange = () => {
    if (currentPage < numberPages) {
      dispatch(paged(currentPage + 1));
    }
  };

  const handlePreviousChange = () => {
    if (currentPage > 1) {
      dispatch(paged(currentPage - 1));
    }
  };

  return (
    <div className={styles.container}>
      <div >
        <button className={styles.container_button} onClick={handlePreviousChange} >Prev</button>
      </div>
      <div  className={styles.container_paged}>
        <label htmlFor="">
          {currentPage}  of  {numberPages}
        </label>
      </div>
      <div >
        <button  className={styles.container_button} onClick={handleNextChange} >Next</button>
      </div>
      
    </div>
  );
}
