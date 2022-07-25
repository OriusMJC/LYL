import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../config';
import { getAllVehicles } from '../redux/actions';
import * as types from '../types';
import notFound from '../media/notFound.jpg'


function VehiclesDetails() {
  const dispatch = useAppDispatch();
  const vehicles = useSelector((state:any) => state && state.vehicles);
  console.log(vehicles);

  useEffect(() => {
    dispatch(getAllVehicles());
  }, []);

  return (
    <div>
      {
        vehicles && vehicles.length &&
        vehicles.map((v:types.Vehicle) => {
          return (
            <div key = {v.id}>
              {v.photo && v.photo.length ?
              v.photo.map((p:string) => (
                <img src={p}></img>
              ))
              :
              <img src = {notFound}></img>
              }
              <h2>{v.title}</h2>
              <h3>Precio: {v.price}</h3>
              <h3>Año: {v.year}</h3>
              <h3>Kilometros: {v.kilom && v.kilom}</h3>
              <h4>Estado: {v.status}</h4>
              <p>{v.description}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default VehiclesDetails