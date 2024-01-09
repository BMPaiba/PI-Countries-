import React from 'react'
import styles from './Landing.module.css'
import {Link} from 'react-router-dom'


export default function Landing() {  
  return (
    <div className={styles.container}>
      <div >
        <h1>WELCOME TO MY WEBSITE</h1>
        <Link to="/home">
      <button  type="submit"> Login </button>
        </Link>
      </div>
    </div>
  )
}


// ¡Bienvenido a nuestra plataforma de descubrimiento de países!

// ¿Listo para comenzar tu aventura? Navega a través de nuestro sitio y sumérgete en la diversidad de nuestro extraordinario planeta.


