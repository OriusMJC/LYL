import React, { useEffect, useCallback } from 'react';
import { useSelector} from 'react-redux';
import { useAppDispatch } from '../config';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllVehicles, getDetails, deleteVehicle } from '../redux/actions';
import * as types from '../types';
import notFound from '../media/notFound.jpg';
import swal from 'sweetalert';


function VehiclesDetails() {
  const idVehicle:any = useParams().idVehicle;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const vehicle = useSelector((state:any) => state && state.vehicleDetails);
  
  console.log(idVehicle)

  useEffect(() => {
    if(idVehicle){
      dispatch(getDetails(idVehicle));
    }
  }, []);

  const handleDelete = useCallback(() => {
    swal({
      text: 'Estas seguro que queres eliminar este vehiculo?',
      icon: "warning",
      buttons: ["No", "Si"]
    }).then(respuesta => {
      if(respuesta){
        swal({text: "Vehiculo elimindo con exito", icon: "success"});
        dispatch(deleteVehicle(idVehicle));
        navigate('/vehicles')
      }
    })
  }, [])

  return (
    <div>
      <button value = {vehicle.id} onClick = {handleDelete}>ELIMINAR</button>
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