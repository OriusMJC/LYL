import { useState, useEffect } from "react";
import { setPanel } from '../redux/actions';
import { useAppDispatch } from '../config';
import Nav from "./Nav"
import s from './Styles/Contact.module.css';
import wp from '../media/logos/wp.png';
import Footer from "./Footer";
import v from '../media/video1.mp4';

export default function Contact(){
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPanel(true))
    }, []);

    // const num = '3413880895'
    const num = '3415005025'
    // const num = '1126099930'
    const [data,setData] = useState({
        name: '',
        msg: '',
    })

    function handleChange(e:any){
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    return (
        <>
        <Nav></Nav>
        <section id={s.containerContact}>
            <div id = {s.divForm1}>
                <h2>ENVIANOS TU CONSULTA</h2>
                <div id = {s.divOther}>
                    <form>
                        <input  placeholder="Tu nombre" value={data.name} type = 'text' name="name" onChange={handleChange}></input>
                        <textarea placeholder="Tu mensaje" value={data.msg} name="msg" onChange={handleChange}/>
                    </form>
                    <a href={`https://wa.me/${num}?text=${`Hola! Mi nombre es ${data.name}, ${data.msg}`}`} target="_blank">
                        <button>
                            ENVIAR
                        </button>
                    </a> 
                </div>
            </div>
            <div id = {s.video}>
                <video
                src = {v}
                autoPlay
                loop
                muted
                ></video>
            </div>
        </section>
        </>
    )
}