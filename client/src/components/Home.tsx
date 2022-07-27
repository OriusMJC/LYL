import { useState } from 'react';
import Nav from './Nav'
import s from './Styles/Home.module.css';
import v from '../media/video2.mp4';
import font from '../media/TS Block Bold.ttf';

function Home() {
  const [anim, setAnim] = useState(false);

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

    </section>
    </>
  )
}

export default Home