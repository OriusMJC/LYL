import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../config';
import { useParams } from 'react-router-dom';
import { getAllVehicles, getDetails } from '../redux/actions';
import * as types from '../types';
import notFound from '../media/notFound.jpg'


function VehiclesDetails() {
  const {idVehicle} = useParams()
  const dispatch = useAppDispatch();
  const vehicle = useSelector((state:any) => state && state.vehicleDetails);
  
  useEffect(() => {
    if(idVehicle){
      dispatch(getDetails(idVehicle));
    }
  }, []);
  return (
    <div>
      {
        vehicle &&
            <div key = {vehicle.id}>
              {vehicle.photo && vehicle.photo.length ?
              vehicle.photo.map((p:string) => (
                <img src={p}></img>
              ))
              :
              <img src = {notFound}></img>
              }
              <h2>{vehicle.title}</h2>
              <h3>Precio: {vehicle.price}</h3>
              <h3>Año: {vehicle.year}</h3>
              <h3>Kilometros: {vehicle.kilom && vehicle.kilom}</h3>
              <h4>Estado: {vehicle.status}</h4>
              <p>{vehicle.description}</p>
            </div>
      }
    </div>
  )
}

export default VehiclesDetails