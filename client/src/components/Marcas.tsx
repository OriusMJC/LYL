import { Link } from 'react-router-dom';
import { useState } from 'react'; 
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../config'; 
import { setType } from '../redux/actions/index';
import s from './Styles/Marcas.module.css';

function Marcas() {
    const dispatch = useAppDispatch();
    const fotos = useSelector((state:any) => state && state.fotos)

   function handleType(e:any){
    dispatch(setType(e.target.value))
    }

  return (
    <div className = {s.container}>
        {fotos.map((f:any) => {
            const name = f.text;
            const styled = {
                backgroundImage: `url(${f.photo})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: f.photo? 'cover' : 'contain',
                outlineOffset: f.photo? '-8px' : '0px',
            }
            
            return (
                <div className = {s.imgCont}>
                    <Link to = '/vehicles'>
                        <button value = {name} onClick = {handleType} style = {styled}>
                        </button>
                    </Link>
                </div>
            )
        }
        )}
    </div>
  )
}

export default Marcas