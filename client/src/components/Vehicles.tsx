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
  const actualType = useSelector((state:any)=> state && state.actualType);
  let filteredType = allVehicles.filter((v:any) => v.type === actualType[0]);
  const [pos, setPos] = useState(0)
  console.log(filteredType);

  const styledBut = {
    backgroundImage: `url("${allVehicles[pos]?.photo[0]}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: allVehicles[pos]?.photo[0]? 'cover' : 'contain',
    outlineOffset: allVehicles[pos]?.photo[0]? '-8px' : '0px',
    transition: '.2s',
    border: "none",
  }

  const styledButF = {
    backgroundImage: `url("${filteredType[pos]?.photo[0]}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: filteredType[pos]?.photo[0]? 'cover' : 'contain',
    outlineOffset: filteredType[pos]?.photo[0]? '-8px' : '0px',
    transition: '.2s',
    border: "none",
  }

  const handleFilter = () => {
    dispatch(setType(undefined))
    dispatch(getAllVehicles())
  }

  const handleHover = (e:any) => {
    setPos(e.target.value)
  }

  return (
    <>
    <div className = {s.superCont}>
    <div id={s.vehiclesContainer}>
      <div className = {s.subDiv}>
      <div className = {s.imgDiv}>
      <Link to = "/" >
        <img src= {logo} alt = "logo"></img>
      </Link>
      </div>
      <div className = {s.subDiv2}>
      {filteredType && <button onClick = {handleFilter} className = {s.titleH2}>X</button>}
      <SearchBar/>
      </div>
      <section id={s.sectionVehicles}>
        {filteredType && filteredType.length ?
        filteredType.map((t:any, i:any) => 
        <Link to = {`/vehicles/${t.id}`} id = {s.links}>
          <button className = {s.h2} value = {i} onMouseOver = {handleHover}>{t.title.toUpperCase()}</button>
        </Link>
        )
        :
        allVehicles && allVehicles.length ? 
          allVehicles.map((v:types.Vehicle, i:any) => {
            return (
              <Link to = {`/vehicles/${v.id}`} id = {s.links}>
                <button className = {s.h2} value={i} onMouseOver = {handleHover}>{v.title.toUpperCase()}</button>
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
    
    <div className = {s.imgContainer} style={!filteredType.length ? styledBut : styledButF}>
      {/* <img src= {allVehicles && allVehicles[pos].photo[0]}></img> */}
    </div>

    </div>
    </>
  )
}

export default Vehicles