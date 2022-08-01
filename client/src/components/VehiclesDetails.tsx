import React, { useEffect, useCallback, useState } from 'react';
import { useSelector} from 'react-redux';
import { useAppDispatch } from '../config';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAllVehicles, getDetails, deleteVehicle } from '../redux/actions';
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
import video from '../media/video1.mp4'


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
    // <div id={s.containerVehicleDetails}>
    //   <div id={s.navVDetails}>
    //     <Link to='/vehicles'>
    //       <BiLeftArrowAlt className = {s.leftArrow}/>
    //     </Link>
    //     <Link to = "/" className = {s.imgDiv}>
    //       <img src= {logo} alt = "logo"></img>
    //     </Link>
    //   </div>
    //   <section id={s.vehicleDetails}>
    //     {deleteBtn && <button value = {vehicle.id} onClick = {handleDelete} className={s.btnDelete}>ELIMINAR</button>}
    //     {/* <h1>{vehicle.title}</h1> */}
    //     {
    //       vehicle &&
    //         <div key = {vehicle.id} id={s.containDetails}>
    //           <div id={s.containPhotoDetails}>
    //             <div className={s.photoAndDetails} style={styledBut}>
    //               {/* <img src={photo} alt='Vehicle photo'/> */}
    //               {/* {
    //                 photo.slice(-3) !== 'mp4'?
    //                 :
    //                 <ReactPlayer 
    //                 url = {require(`../media/videos/${vehicle.video}`)}
    //                 controls
    //                 autoplay
    //                 />

    //               } */}
    //             </div>
    //             {/* <div className={s.photoAndDetails}>
    //               <h3>Kilometros: {vehicle?.kilom}</h3>
    //               <h3>Precio: ${vehicle.price}</h3>
    //               <h3>Año: {vehicle.year}</h3>
    //               <h4>Estado: {vehicle.status}</h4>
    //               <Link to='/contact'>
    //                 <button className={s.btnContact}>Contactar!</button>
    //               </Link>
    //             </div> */}
    //           </div>
    //           <div id={s.contImgs}>
    //             <video 
    //               src = {vehicle?.video? require(`../media/videos/${vehicle.video}`) : v}
    //               autoPlay
    //               loop
    //               muted
    //               />
    //             <div>
    //               {vehicle.photo && vehicle.photo.length?
    //                 vehicle.photo.map((p:string) => (
    //                   <img src={p} onClick={()=>{setPhoto(p)}} alt='Vehicle photo' className={photo === p? s.photoActive : undefined}></img>
    //                 ))
    //               :
    //                 null
    //               }
    //             </div>
    //           </div>
    //         </div>
    //     }
    //     {/* <h3>Kilometros:</h3>
    //     <p>{vehicle?.kilom}</p> */}
    //   </section>
    //   <section id={s.contentDetails}>
    //   {/* <div id={s.details}>
    //       <h3 className={s.detailsH3}>Kilometros:</h3>
    //       <p>{vehicle?.kilom}</p>
    //       <h3 className={s.detailsH3}>Precio:</h3>
    //       <p>${vehicle.price}</p>
    //       <h3 className={s.detailsH3}>Año: </h3>
    //       <p>{vehicle.year}</p>
    //       <h3 className={s.detailsH3}>Estado: </h3>
    //       <p>{vehicle.status}</p>
    //       <Link to='/contact'>
    //         <button className={s.btnContact}>Contactar!</button>
    //       </Link>
    //     </div> */}
    //       <Link to='/contact'>
    //         <button className={s.btnContact}>Contactar!</button>
    //       </Link>
    //     <div id={s.details}>
    //       {/* <hr></hr>
    //       <div className={s.detailsMin}>
    //         <div>
    //           <h3>KILOMETROS: </h3>
    //           <p>{vehicle?.kilom}</p>
    //         </div>
    //         <div>
    //           <h3>PRECIO: </h3>
    //           <p>${vehicle.price}</p>
    //         </div>
    //       </div>
    //       <div className={s.detailsMin}>
    //         <div>
    //           <h3>AÑO:</h3>
    //           <p>{vehicle.year}</p>
    //         </div>
    //         <div>
    //           <h3>ESTADO: </h3>
    //           <p>{vehicle.status?.toUpperCase()}</p>
    //         </div>
    //       </div>
    //       <hr></hr> */}
    //       <h1>{vehicle?.title?.toUpperCase()}</h1>
    //       <hr></hr>
    //       {/* <h3>Descripción:</h3> */}
    //       <p>{vehicle?.description}</p>
    //       <div className={s.detailsMin}>
    //         <div>
    //           <h3>KILOMETROS: </h3>
    //           <p>{vehicle?.kilom}</p>
    //         </div>
    //       </div>
    //       <div className={s.detailsMin}>
    //         <div>
    //           <h3>ESTADO: </h3>
    //           <p>{vehicle.status?.toUpperCase()}</p>
    //         </div>
    //       </div>
    //     </div>
    //       {/* <h3>Recomendados:</h3>
    //     <div id={s.suggest}>
    //       {
    //         suggest.length && suggest.map((v:types.Vehicle) => {
    //           return (
    //             <Card v={v}/>
    //           )
    //         })
    //       }
    //     </div> */}
    //   </section>
    // </div>
    <>
    <section id = {s.section1}>
      <div id = {s.photo}>
        <img src={photo}></img>
      </div>
      <div id = {s.videoAndDiv}>
        <video
        src = {video}
        autoPlay
        loop
        muted
        >
        </video>
        <div>
        {vehicle.photo && vehicle.photo.length?
          vehicle.photo.map((p:string) => (
            <img src={p} onClick={()=>{setPhoto(p)}} alt='Vehicle photo' className={photo === p? s.photoActive : undefined}></img>
          ))
        :
          null
        }
        </div>
      </div>

    </section>
    <section id = {s.section2}>

    </section>
    </>
  )
}

export default VehiclesDetails