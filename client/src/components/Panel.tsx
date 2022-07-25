import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../config';
import { createVehicle } from '../redux/actions';
import { useVerfication } from '../services/services';

function Panel() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [vehicleData,setVehicleData] = useState({
    id:'',
    title: '',
    photo: [],
    price: 0,
    status: 'Nuevo',
    kilom: 0,
    year: 0,
    description: ''
  })

  function handleSubmit(event:any){
    dispatch(createVehicle(vehicleData))
  }

  function handleChange(event:any){
    setVehicleData({
        ...vehicleData,
        [event.target.name]: event.target.value
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
    data.append('uplod_preset', 'chropyis');

    const res = await fetch("https://api.cloudinary.com/v1_1/mypc/LyL/upload", { method: "POST", body: data });
    console.log(res);
    const file = await res.json();

    console.log(file)

    // if(!file.error){
    //   setVehicleData({
    //     ...vehicleData,
    //     photo: [file.secure_url]
    //   })
    // }else console.log(file.error)

  }


  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>CREAR POSTEO</h1>
        <label>Titulo</label>
        <input name="title" type="text" value={vehicleData.title} onChange={handleChange}/>

        <label>Imagen</label>
        <input name="photo" type="file" value={vehicleData.photo} onChange={uploadImage}/>

        <label>Precio</label>
        <input name="price" type="number" value={vehicleData.price} onChange={handleChange}/>

        <label>Estado</label>
        <select name="status" onChange={handleChange}>
          <option value='Nuevo'>Nuevo</option>
          <option value='Usado'>Usado</option>
        </select>

        <label>Kilometraje</label>
        <input name="kilom" type="number" value={vehicleData.kilom} onChange={handleChange}/>

        <label>Año</label>
        <input name="year" type="number" value={vehicleData.year} onChange={handleChange}/>

        <label>Descripcion</label>
        <input name="description" type="text" value={vehicleData.description} onChange={handleChange}/>
      </form>
    </section>
  )
}

export default Panel