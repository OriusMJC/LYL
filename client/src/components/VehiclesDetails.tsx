import React, { useEffect, useCallback, useState } from 'react';
import { useSelector} from 'react-redux';
import { useAppDispatch } from '../config';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAllVehicles, getDetails, deleteVehicle } from '../redux/actions';
import * as types from '../types';
import notFound from '../media/notFound.jpg';
import swal from 'sweetalert';
import s from './Styles/VehicleDetails.module.css'
import Card from './Card';


function VehiclesDetails() {
  const idVehicle:any = useParams().idVehicle;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const suggest = useSelector((state:any)=> state && state.allVehicles)
  const vehicle = useSelector((state:any) => state && state.vehicleDetails);
  const [deleteBtn, setDeleteBtn] = useState(false)
  const [photo,setPhoto] = useState(notFound)

  
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
  useEffect(() => {
    if(idVehicle){
      dispatch(getDetails(idVehicle));
    }
  }, []);
  
  useEffect(()=>{
    let data = window.localStorage.getItem("userDataLogin");
    let dataParse = data ? JSON.parse(data) : null
    if(dataParse && dataParse.email){
        setDeleteBtn(true)
    }
  },[])

  useEffect(()=>{
    vehicle.photo && vehicle.photo.length && setPhoto(vehicle.photo[0])
  },[vehicle])

  return (
    <section id={s.containerVehicleDetails}>
      <div id={s.vehicleDetails}>
        {deleteBtn && <button value = {vehicle.id} onClick = {handleDelete} className={s.btnContact}>ELIMINAR</button>}
        {
          vehicle &&
            <div key = {vehicle.id} id={s.containDetails}>
              <div id={s.containPhotoDetails}>
                <div className={s.photoAndDetails}>
                  <img src={photo} alt='Vehicle photo'/>
                </div>
                <div className={s.photoAndDetails}>
                  <h2>{vehicle.title}</h2>
                  <h3>Precio: ${vehicle.price}</h3>
                  <h3>Año: {vehicle.year}</h3>
                  <h4>Estado: {vehicle.status}</h4>
                  <Link to='/contact'>
                    <button className={s.btnContact}>Contactar!</button>
                  </Link>
                </div>
              </div>
              <div id={s.contImgs}>
                {vehicle.photo && vehicle.photo.length?
                  vehicle.photo.map((p:string) => (
                    <img src={p} onClick={()=>{setPhoto(p)}} alt='Vehicle photo' className={photo === p? s.photoActive : undefined}></img>
                  ))
                :
                  null
                }
              </div>
            </div>
        }
        <h3>Kilometros:</h3>
        <p>{vehicle?.kilom}</p>
        <h3>Descripción:</h3>
        <p>{vehicle?.description}</p>
        <h3>Recomendados:</h3>
        <div id={s.suggest}>
          {
            suggest.length && suggest.map((v:types.Vehicle) => {
              return (
                <Card v={v}/>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default VehiclesDetails