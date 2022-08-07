import React from 'react';
import s from './Styles/Footer.module.css';
import logo from '../media/logo.png';
import instagram from '../media/logos/instagram2.png';
import wp from '../media/logos/whatsapp2.png';
import ubicacion from '../media/logos/ubicacion.png';
import fb from '../media/logos/fb.png';
import reloj from '../media/logos/reloj.png';

function Footer() {
    const num = '3415005025'
  return (
    <div className = {s.container}>
        <img src = {logo} alt = "logo" id = {s.img1}></img>
        <div>
            <h2>Nuestras Redes</h2>
            <div>
                <a href = 'https://www.instagram.com/lylautomotores_/' target = '_blank'>
                    <img src = {instagram} alt = 'instagram'></img>
                    lylautomotores
                </a>
                <a href = 'https://www.facebook.com/groups/288584841164363/user/100016179736070/' target = '_blank' id = {s.id2}>
                    <img src = {fb} alt = 'facebook'></img>
                    lyl Lopez
                </a>
            </div>
        </div>
        <div>
            <h2>Contactanos</h2>
            <div>
            <a href = {`https://wa.me/${num}`} target = '_blank'>
                <img src = {wp} alt = 'whatsapp'></img>
                3413880895
            </a>
            </div>
        </div>
        <div>
            <h2>Horarios de Atencion</h2>
            <div>
            <a id = {s.id}>
                Lunes a Viernes de 10 a 13 hs y 15 a 18hs
            </a>
            </div>
        </div>
        <div>
            <h2>Ubicacion</h2>
            <div>
            <a>
                <img src = {ubicacion} alt = 'ubicacion'></img>
                España 2201
            </a>
            </div>
        </div>
    </div>
  )
}

export default Footer