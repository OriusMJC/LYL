import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../config';
import { createVehicle } from '../redux/actions';
import { useVerfication } from '../services/services'
import s from './Styles/Panel.module.css';
import Nav from './Nav';

function Panel() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const types = useSelector((state:any) => state && state.types);
  const [vehicleData,setVehicleData] = useState<any>({
    title: '',
    video: '',
    photo: [],
    price: null,
    status: 'Nuevo',
    kilom: null,
    year: null,
    type: '',
    description: ''
  })

  function handleSubmit(event:any){
    event.preventDefault()
    dispatch(createVehicle(vehicleData))
    navigate('/vehicles')
  }

  function handleChange(event:any){
    setVehicleData({
        ...vehicleData,
        [event.target.name]: event.target.value
    })
  }

  function handleSelectVideo(event:any){
    setVehicleData({
      ...vehicleData,
      video: (event.target.value).slice(12, event.target.value.length)
    })
  }

  useEffect(()=>{
    let data = window.localStorage.getItem("userDataLogin");
    let dataParse = data ? JSON.parse(data) : null
    if(dataParse && dataParse.email){
    }else{
        navigate(`/admin/login`)
    }
  },[])

  const uploadImage = async(e:any) => {
    const files = e.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'chropyis');

    const res = await fetch("https://api.cloudinary.com/v1_1/mypc/image/upload", { method: "POST", body: data });
    const file = await res.json();

    if(!file.error && file.secure_url !== undefined){
      setVehicleData({
        ...vehicleData,
        photo: [...vehicleData.photo, file.secure_url]
      })
    }else console.log(file.error);

  }


  return (
    <>
    <Nav/>
    <section id={s.panelContainer}>
      <form onSubmit={handleSubmit} id={s.formPanel}>
        <h1>CREAR ARTICULO</h1>
        <div id = {s.files}>
          <input name="photo" type="file" onChange={uploadImage} required id = {s.imagenes}/>
          <input name="video" type="file" onChange={handleSelectVideo} id = {s.videos}/>
        </div>

        <input name="title" type="text" value={vehicleData.title} onChange={handleChange} required placeholder="Titulo" id = {s.inputs}/>
        <input placeholder = "Precio" name="price" type="number" value={vehicleData.price} onChange={handleChange} required id = {s.inputs}/>

        <select name="status" onChange={handleChange} id = {s.select}>
          <option hidden>Estado</option>
          <option value='Nuevo'>Nuevo</option>
          <option value='Usado'>Usado</option>
        </select>

        <select name = "type" onChange={handleChange} id = {s.select}>
          <option hidden>Tipo</option>
          {types.map((t:any) => <option value = {t}>{t}</option>)}
        </select>

        <input placeholder = "Kilometros" name="kilom" type="number" value={vehicleData.kilom} onChange={handleChange} id = {s.inputs}/>

        <input placeholder = "Año" name="year" type="number" value={vehicleData.year} onChange={handleChange} required id = {s.inputs}/>

        <textarea placeholder = "Descripción" name="description"  value={vehicleData.description} onChange={handleChange} required id = {s.inputs1}/>
        <button>Publicar</button>
      </form>
      <div className = {s.showInfo}>

      </div>
    </section>
    </>
  )
}

export default Panel