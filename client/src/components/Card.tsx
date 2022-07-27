import { Link } from 'react-router-dom';
import * as types from '../types';
import notFound from '../media/notFound.jpg'
import s from './Styles/Vehicles.module.css'

export default function Card({v}:any){

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
    return(
        <div key = {v.id} className={s.cardVechicle}>
            <Link to = {`/vehicles/${v.id}`}>
                <div style={styledBut}></div>
                <h2>{v.title}</h2>
                <b>{v.status}</b>
                <p>Año: {v.year}</p>
            </Link>
        </div>
    )
}