import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setType, setPanel } from '../redux/actions/index';
import { useAppDispatch } from '../config';
import Slider from './Slider';
import Marcas from './Marcas';
import Nav from './Nav';
import s from './Styles/Home.module.css';
import v from '../media/video2.mp4';
import font from '../media/RFDewiExpanded.woff';
import {BsArrowRightCircle} from 'react-icons/bs';
import * as types from '../types'


function Home() {
  const dispatch = useAppDispatch();
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    dispatch(setPanel(false))
  })
  
  const changeAnim = () => {
    if(window.scrollY > 800){
      setAnim(true)
    }else{
      setAnim(false);
    }
  }

  window.addEventListener('scroll', changeAnim);
  window.scroll({
    behavior: 'smooth',
  })

  const style2 = {
    fontFamily: font
  }

  const handleType = () => {
    dispatch(setType(undefined))
  }

  return (
    <>
    <Nav/>
    <section className = {s.main}>
      <video 
      src = {v}
      autoPlay
      loop
      muted
      />
      <div className = {s.content}>
        {
          !anim &&
          <div className = {s.animation} >
          <h1 className = {s.text} style = {style2}>BIENVENIDO</h1>
          <h3 className = {s.text}>#ARRANCAELMOTOR</h3>
          </div>
        }
      </div>
    </section>
    <section className = {s.main2}>
      <Slider/>
    </section>
    <section className = {s.main3}>
      <Marcas/>
    </section>
    <footer className = {s.footer}>
        <h3>CONOCE NUESTRAS MARCAS</h3>
        <Link to = '/vehicles'>
          <BsArrowRightCircle className = {s.arrow} onClick = {handleType}/>
        </Link>
    </footer>
    </>
  )
}

export default Home