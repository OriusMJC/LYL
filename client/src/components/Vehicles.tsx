import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { changePage, getAllVehicles } from '../redux/actions/index';
import { useAppDispatch } from '../config';
import * as types from '../types';
import notFound from '../media/notFound.jpg'
import SearchBar from './SearchBar';
import s from './Styles/Vehicles.module.css'

function Vehicles() {
  const dispatch = useAppDispatch();
  
  useEffect(()=> {
    dispatch(getAllVehicles());
  }, [])  

  const allVehicles = useSelector((state:any) => state && state.vehicles);

  const cantPages = Math.ceil(allVehicles?.length / 12)
  const actualPage = useSelector((state:any)=> state && state.actualPage)
  const [currentPage, setCurrentPage] = useState(actualPage);
  const indexOfLastProduct = currentPage * 12;
  const indexOfFirstProduct = indexOfLastProduct - 12;
  const currentProduct = allVehicles?.slice(indexOfFirstProduct, indexOfLastProduct); 

  const pageNumbers = [];
  // if(typeof allVehicles[0] !== 'string'){
  if(allVehicles?.length){
    for (let i = 1; i <= cantPages; i++){
      pageNumbers.push(
        <button key={i} value={i} onClick={()=>{setCurrentPage(i); dispatch(changePage(i))}} className={i===currentPage? s.buttonActive : s.btnsPage}>
          {i}
        </button>
        )
    }
  }
  
  

  return (
    <div id={s.vehiclesContainer}>
      <SearchBar/>
      <section id={s.sectionVehicles}>
        {allVehicles && allVehicles.length ? 
          currentProduct.map((v:types.Vehicle) => {
            const styledBut = {
              backgroundImage: `url("${v.photo[0] ? v.photo[0] : notFound}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: v.photo[0]? 'cover' : 'contain',
              outlineOffset: v.photo[0]? '-8px' : '0px',
              width:  '280px',
              height: '210px',
              transition: '.2s',
            }
            console.log(v.photo[0])
            return (
              <div key = {v.id} className={s.cardVechicle}>
                <Link to = {`/vehicles/${v.id}`}>
                  <div style={styledBut}></div>
                  <h2>{v.title}</h2>
                  <b>{v.status}</b>
                  <p>Año: {v.year}</p>
                </Link>
              </div>
            )
          })
        :
        <div>
          <h2>Aun no hay vehiculos cargados</h2>
        </div>
        }
      </section>
      <div id={s.btnsContainer}>
        {pageNumbers}
      </div>
    </div>
  )
}

export default Vehicles