import React, { useEffect, useCallback, useState } from 'react';
import { useSelector} from 'react-redux';
import { useAppDispatch } from '../config';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAllVehicles, getDetails, deleteVehicle, setPanel, updateData } from '../redux/actions';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Footer from './Footer';
import wp from '../media/logos/whatsapp.png'


function VehiclesDetails() {
  
  const data = window.localStorage.getItem("userDataLogin");
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
  //vista general, info, cont
  const [view,setView] = useState('gen')
  const [msg,setMsg] = useState('')
  const num = '3415005025'
  //ver foto
  const [show,setShow] = useState(false)
  const [bigPhoto,setBigPhoto] = useState('')
  
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
    <div id={show? s.contPhoto : s.bigPhotoN}>
      <button onClick={()=>setShow(false)} id={show? s.bigPhoto : s.bigPhotoN}>
        {/* <button>
          <FontAwesomeIcon icon={solid('x')} />
        </button> */}
      </button>
        <img src={bigPhoto} alt='vista grande de foto'></img>
    </div>
    <section id = {s.section1}>
    { vehicle.presentation && presentationType === 'mp4' ? 
      <video
      src = {require(`../media/videos/${vehicle.presentation[0]}`)}
      autoPlay
      muted
      loop
      preload = "auto"
      playsInline
      id = {s.video}
      />
      :
      <img src = {vehicle.presentation && vehicle.presentation[0]} id = {s.img1}></img>  
    }
    <h1 id = {s.title}>{`#VIVILAEXPERIENCIA${vehicle && vehicle.type && vehicle.type.toUpperCase()}`}</h1>
    </section>
    <section id = {s.section2}>
      <div id = {s.div1}>
        <div id = {s.divNav}>
          <h2 onClick={()=>{setView('gen')}} className={view === 'gen'? s.select : ''}>General</h2>
          <h2 onClick={()=>{setView('info')}} className={view === 'info'? s.select : ''}>Informacion</h2>
          <h2 onClick={()=>{setView('contact')}} className={view === 'contact'? s.select : ''}>Contacto</h2>
          <h2 onClick={()=>{setView('admin')}} className={view === 'admin'? s.select : ''}>Admin</h2>
        </div>
        {
          view === 'gen' ?
          <div id = {s.div2}>
            <div className = {s.divIzq}>
              <div id = {s.divA}>
                <h1>{vehicle.title && vehicle.title.toUpperCase()}</h1>
                <p>{vehicle.description}</p>
              </div>
              <div id = {s.divB} onClick={()=>{setShow(true);setBigPhoto(vehicle.photo[1])}}>
                <img src = {vehicle.photo && vehicle.photo[1]} id = {s.imgV}></img>
              </div>
              <div id = {s.divC} onClick={()=>{setShow(true);setBigPhoto(vehicle.photo[3])}}>
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
              <div id = {s.divE} onClick={()=>{setShow(true);setBigPhoto(vehicle.photo[0])}}>
                <img src = {vehicle.photo && vehicle.photo[0]} id = {s.imgV}></img>
              </div>
              <div id = {s.divF} onClick={()=>{setShow(true);setBigPhoto(vehicle.photo[2])}}>
                <img src = {vehicle.photo && vehicle.photo[2]} id = {s.imgV}></img>
              </div>
              <div id = {s.divG} onClick={()=>{setShow(true);setBigPhoto(vehicle.photo[4])}}>
                <img src = {vehicle.photo && vehicle.photo[4]} id = {s.imgV}></img>
              </div>
            </div>
          </div>
          :
            view === 'info'?
              <div id = {s.divInfo}>
                <div id = {s.divInfoCont}>
                  <h2>General</h2>
                  <div>
                    {vehicle && vehicle.generalInfo &&
                    <>
                    <label>Tipo de Combustible
                      <span>{vehicle.generalInfo.tipoDeCombustible}</span>
                    </label>
                    <label>Transmision
                      <span>{vehicle.generalInfo.transmision}</span>
                    </label>
                    <label>Motorizacion
                      <span>{vehicle.generalInfo.motorizacion}</span>
                    </label>
                    <label>Turbo
                      <span>{vehicle.generalInfo.turbo}</span>
                    </label>
                    <label>Kilometraje
                      <span>{vehicle.kilom} km</span>
                    </label>
                    </>
                    }
                  </div>
                  <h2>Exterior</h2>
                  <div>
                    {vehicle && vehicle.exterior &&
                    <>
                    <label>Apertura de Baul
                      <span>{vehicle.exterior.aperturaDeCajuela}</span>
                    </label>
                    <label>Numero de puertas
                      <span>{vehicle.exterior.numeroDePuertas}</span>
                    </label>
                    </>}
                  </div>
                  <h2>Equipamiento</h2>
                  <div>
                    {vehicle && vehicle.equipamiento &&
                    <>
                    <label>Alarma
                      <span>{vehicle.equipamiento.alarma}</span>
                    </label>
                    <label>Aire Acondicionado
                      <span>{vehicle.equipamiento.aireAcondicionado}</span>
                    </label>
                    <label>Espejos Electricos
                      <span>{vehicle.equipamiento.espejosElectricos}</span>
                    </label>
                    <label>Butacas Calefaccionadas
                      <span>{vehicle.equipamiento.butacasCalefaccionadas}</span>
                    </label>
                    <label>Control de Velocidad
                      <span>{vehicle.equipamiento.controlDeVelocidad}</span>
                    </label>
                    </>}
                  </div>
                  <h2>Seguridad</h2>
                  <div>
                    {vehicle && vehicle.seguridad && 
                    <>
                    <label>ABS
                      <span>{vehicle.seguridad.ABS}</span>
                    </label>
                    <label>Cantidad de Airbags
                      <span>{vehicle.seguridad.cantidadDeAirbags}</span>
                    </label>
                    <label>Control de Estabilidad
                      <span>{vehicle.seguridad.controlEstabilidad}</span>
                    </label>
                    <label>Control de Traccion
                      <span>{vehicle.seguridad.controlTraccion}</span>
                    </label>
                    </>}
                  </div>
                  <h2>Interior</h2>
                  <div>
                    {vehicle && vehicle.interior &&
                    <>
                    <label>Regulacion de Butaca
                      <span>{vehicle.interior.regulacionDeButaca}</span>
                    </label>
                    <label>Regulacion de Volante
                      <span>{vehicle.interior.regulacionDeVolante}</span>
                    </label>
                    </>}
                  </div>
                  <h2>Multimedia</h2>
                  <div>
                    {vehicle && vehicle.multimedia &&
                    <>
                    <label>Bluetooth
                      <span>{vehicle.multimedia.bluetooth}</span>
                    </label>
                    <label>GPS
                      <span>{vehicle.multimedia.GPS}</span>
                    </label>
                    <label>USB
                      <span>{vehicle.multimedia.USB}</span>
                    </label>
                    </>}
                  </div>
                </div>
              </div>
              :
              view === 'contact' ?
              <div id={s.secContact}>
                <h1>ENVIANOS TU CONSULTA</h1>
                <form>
                    <textarea placeholder="Tu mensaje" value={msg} name="msg" onChange={(e)=>setMsg(e.target.value)}/>
                </form>
                <a href={`https://wa.me/${num}?text=${msg}`} target="_blank">
                    <button>
                        ENVIAR A WHATSAPP
                    </button>
                </a>
              </div>
              :
              <>
              {data && 
              <div id = {s.secAdmin}>
              <div id = {s.secAdminCont}>
                <button onClick = {handleDelete} id = {s.btn1}>ELIMINAR VEHICULO</button>
                <Link to = {`/vehicles/edit/${idVehicle}`} id = {s.link}>
                <button id = {s.btn2}>EDITAR VEHICULO</button>
                </Link>
              </div>
              </div>
              }
              </>
        }
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default VehiclesDetails