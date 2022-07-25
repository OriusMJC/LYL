import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
      <ul>
        <Link to = "/vehicles">
          <li>Vehicles</li>
        </Link>
        <li>Sobre nosotros</li>
        <li>Contactanos</li>
      </ul>
    </div>
  )
}

export default Nav