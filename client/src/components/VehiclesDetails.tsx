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
import Loading from './Loading';
import video from '../media/video1.mp4'


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
  const presentationType = vehicle.presentation && vehicle.presentation.length && vehicle.presentation[0].slice(-3)
  // const presentation = vehicle.presentation2.slice(1, 3)
  console.log(vehicle);
  console.log(presentationType)
  // console.log(presentation);
  
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
    <Loading/>
    <Nav/>
    <section id = {s.section1}>
    { vehicle.presentation && presentationType === 'mp4' ? 
      <video
      src = {require(`../media/videos/${vehicle.presentation[0]}`)}
      autoPlay
      muted
      loop
      id = {s.video}
      />
      :
      <img src = {vehicle.presentation && vehicle.presentation[0]}></img>  
    }
    <h1 id = {s.title}>{`#VIVILAEXPERIENCIA${vehicle && vehicle.type && vehicle.type.toUpperCase()}`}</h1>
    </section>
    <section id = {s.section2}>
      <div id = {s.div1}>
        <div id = {s.divNav}>
          <h2>General</h2>
          <h2>Informacion</h2>
          <h2>Contacto</h2>
        </div>
        <div id = {s.div2}>
          <div id = {s.divIzq}>
            <div id = {s.divA}>
              <h1>{vehicle.title && vehicle.title.toUpperCase()}</h1>
              <p>{vehicle.description}</p>
            </div>
            <div id = {s.divB}>
              <img src = {vehicle.photo && vehicle.photo[1]} id = {s.imgV}></img>
            </div>
            <div id = {s.divC}>
            <img src = {vehicle.photo && vehicle.photo[3]} id = {s.imgV}></img>
            </div>
            {vehicle.video !== '' && vehicle.video &&
            <div id = {s.divD}>
            <video
            src = {require(`../media/videos/${vehicle.video}`)}
            autoPlay
            controls
            loop
            muted
            id = {s.video2}
            ></video>
            </div>
            }
          </div>
          <div id = {s.divDer}>
            <div id = {s.divE}>
              <img src = {vehicle.photo && vehicle.photo[0]} id = {s.imgV}></img>
            </div>
            <div id = {s.divF}>
            <img src = {vehicle.photo && vehicle.photo[2]} id = {s.imgV}></img>
            </div>
            <div id = {s.divG}>
              <img src = {vehicle.photo && vehicle.photo[4]} id = {s.imgV}></img>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default VehiclesDetails