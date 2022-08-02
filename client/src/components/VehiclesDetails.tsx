import React, { useEffect, useCallback, useState } from 'react';
import { useSelector} from 'react-redux';
import { useAppDispatch } from '../config';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAllVehicles, getDetails, deleteVehicle, setPanel } from '../redux/actions';
import * as types from '../types';
import notFound from '../media/notFound.jpg';
import play from '../media/play-button-transparent.png';
import swal from 'sweetalert';
import s from './Styles/VehicleDetails.module.css'
import Card from './Card';
import ReactPlayer from 'react-player';
import Nav from './Nav';
import v from '../media/videos/jeep.mp4'
import logo from '../media/logo.png'
import { BiLeftArrowAlt } from 'react-icons/bi';
<<<<<<< HEAD
import Loading from './Loading';
=======
import video from '../media/video1.mp4'
>>>>>>> 3669f26991ab3d3a1ef77a02893d9205ed99be69


function VehiclesDetails() {
  
  const idVehicle:any = useParams().idVehicle;
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(setPanel(false))
  }, [])

  const navigate = useNavigate();
  const suggest = useSelector((state:any)=> state && state.allVehicles)
  const vehicle = useSelector((state:any) => state && state.vehicleDetails);
  const [deleteBtn, setDeleteBtn] = useState(false)
  const [photo,setPhoto] = useState(notFound)

  console.log(vehicle);
  
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
  }, [idVehicle]);
  
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
  
  const styledBut = {
    backgroundImage: `url("${photo}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: photo? 'cover' : 'contain',
    outlineOffset: photo? '-8px' : '0px',
    transition: '.2s',
  }

  return (
    <>
    <Nav/>
    <section>

    </section>
    <section>

    </section>
    </>
  )
}

export default VehiclesDetails