import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { changePage, getAllVehicles, setType} from '../redux/actions/index';
import { useAppDispatch } from '../config';
import * as types from '../types';
import SearchBar from './SearchBar';
import s from './Styles/Vehicles.module.css'
import Nav from './Nav'
import Card from './Card';
import logo from '../media/lyl-negro.png';

function Vehicles() {
  const dispatch = useAppDispatch();
  
  useEffect(()=> {
    dispatch(getAllVehicles())
  }, []);

  const allVehicles = useSelector((state:any) => state && state.vehicles);
  const actualPage = useSelector((state:any)=> state && state.actualPage);
  const actualType = useSelector((state:any)=> state && state.actualType);
  let filteredType = allVehicles.filter((v:any) => v.type === actualType[0]);
  
  const cantPages = Math.ceil(allVehicles?.length / 12)
  const [currentPage, setCurrentPage] = useState(actualPage);
  const indexOfLastProduct = currentPage * 12;
  const indexOfFirstProduct = indexOfLastProduct - 12;
  const currentProduct = allVehicles?.slice(indexOfFirstProduct, indexOfLastProduct); 

  const handleFilter = () => {
    dispatch(setType(undefined))
  }

  return (
    <>
    <div className = {s.superCont}>
    <div id={s.vehiclesContainer}>
      <div className = {s.subDiv}>
      <Link to = "/" className = {s.imgDiv}>
        <img src= {logo} alt = "logo"></img>
      </Link>
      <div className = {s.subDiv2}>
      {filteredType && <button onClick = {handleFilter} className = {s.titleH2}>X</button>}
      <SearchBar/>
      </div>
      <section id={s.sectionVehicles}>
        {filteredType && filteredType.length ?
        filteredType.map((t:any) => 
        <Link to = {`/vehicles/${t.id}`} id = {s.links}>
          <h2 className = {s.h2}>{t.title}</h2>
        </Link>
        )
        :
        allVehicles && allVehicles.length ? 
          currentProduct.map((v:types.Vehicle) => {
            return (
              <Link to = {`/vehicles/${v.id}`} id = {s.links}>
                <h2 className = {s.h2}>{v.title.toUpperCase()}</h2>
              </Link>
            )
          })
        :
        <div>
          <h2 className = {s.h2}>Aun no hay vehiculos cargados</h2>
        </div>
        }
      </section>
      </div>
    </div>

    <div className = {s.imgContainer}>
      <img src= {allVehicles && allVehicles[0].photo[0]}></img>
    </div>

    </div>
    </>
  )
}

export default Vehicles