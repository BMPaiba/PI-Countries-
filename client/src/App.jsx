import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios'
import './App.css'
import { addCountries } from "./redux/actions.js";
import Landing from './components/visibleComponents/landing/Landing';
import Home from './components/visibleComponents/home/Home';
import DetailCountry from './components/visibleComponents/detail/DetailCountry';
import FormCreateActivity from './components/visibleComponents/form/FormCreateActivity';

function App() {
  const URL_API = import.meta.env.VITE_URL_API;
  const URL = `${URL_API}/countries`;
  const dispatch = useDispatch();
  const {countries} = useSelector((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(URL);
        if (data) {
          dispatch(addCountries(data));
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error.message);
      }
    };
    fetchData();
  }, []);


  return (
    <>
     <Routes>
        <Route path='/' element= {<Landing/>}/>
        <Route path='/home' element= {<Home countries={countries}/>}/>
        <Route path='/detail/:id' element= {<DetailCountry/>}/>
        <Route path='/form' element= {<FormCreateActivity countries={countries}/>}/>
     </Routes>
    </>
  )
}

export default App

