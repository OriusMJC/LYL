import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllVehicles } from '../redux/actions/index';
import { useAppDispatch } from '../config';
import * as types from '../types';
import notFound from '../media/notFound.jpg'

function Vehicles() {
  const dispatch = useAppDispatch();
  
  useEffect(()=> {
    dispatch(getAllVehicles());
  }, [dispatch])  

  let vehicles = useSelector((state:any) => state && state.vehicles);

  return (
    <div>
      {vehicles && vehicles.length ? 
      vehicles.map((v:types.Vehicle) => {
        return (
          <Link to = {`/vehicles/${v.id}`}>
            <div key = {v.id}>
              <img src = {v.photo[0] ? v.photo[0] : notFound}></img>
              <h2>{v.title}</h2>
              <h4>{v.year}</h4>
          </div>
          </Link>
        )
      })
      :
      <div>
      <h2>Aun no hay vehiculos cargados</h2>
      <Link to = '/vehicles/create'>
        <button><em>CREAR</em></button>
      </Link>
      </div>
      }
    </div>
  )
}

export default Vehicles