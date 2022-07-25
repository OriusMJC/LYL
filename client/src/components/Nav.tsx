import React from 'react';
import { Link } from 'react-router-dom';
import s from './Styles/Nav.module.css'

function Nav() {
  return (
    <div id={s.navContainer}>
      <div className={s.navSec}>
        <Link to='/'>
          <img src='https://lylautomotores.com/wp-content/uploads/2021/11/LL-1-62x62.png'/>
        </Link>
      </div>
      <div className={s.navSec}>
        <Link to = "/vehicles">
          <h3>Vehicles</h3>
        </Link>
        <Link to='/'>
          <h3>Sobre nosotros</h3>
        </Link>
        <Link to='/'>
          <h3>Contactanos</h3>
        </Link>
        <Link to = "/">
          <h3>Home</h3>        
        </Link>
      </div>
    </div>
  )
}

export default Nav