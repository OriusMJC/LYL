import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../config';
import { createVehicle } from '../redux/actions';
import { useVerfication } from '../services/services'
import s from './Styles/Panel.module.css'

function Panel() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [vehicleData,setVehicleData] = useState<any>({
    title: '',
    video: '',
    photo: [],
    price: 0,
    status: 'Nuevo',
    kilom: 0,
    year: 0,
    description: ''
  })

  console.log(vehicleData);

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
    <section id={s.panelContainer}>
      <form onSubmit={handleSubmit} id={s.formPanel}>
        <label>Titulo: </label>
        <input name="title" type="text" value={vehicleData.title} onChange={handleChange} required/>
        <label>Imagenes: </label>
        <input name="photo" type="file" onChange={uploadImage} required/>
        <label>Videos: </label>
        <input name="video" type="file" onChange={handleSelectVideo}/>
        <label>Precio: </label>
        <input name="price" type="number" value={vehicleData.price} onChange={handleChange} required/>
        <label>Estado: </label>
        <select name="status" onChange={handleChange}>
          <option value='Nuevo'>Nuevo</option>
          <option value='Usado'>Usado</option>
        </select>
        <label>Kilometros: </label>
        <input name="kilom" type="number" value={vehicleData.kilom} onChange={handleChange}/>
        <label>Año: </label>
        <input name="year" type="number" value={vehicleData.year} onChange={handleChange} required/>
        <label>Descripción: </label>
        <input name="description" type="text" value={vehicleData.description} onChange={handleChange} required/>
        <button>Publicar</button>
      </form>
    </section>
  )
}

export default Panel