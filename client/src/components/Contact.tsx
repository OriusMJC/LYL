import { useState } from "react"
import Nav from "./Nav"
import s from './Styles/Contact.module.css'

export default function Contact(){
    const num = '3413880895'
    // const num = '3415005025'
    // const num = '1126099930'
    const [data,setData] = useState({
        name: '',
        lastname: '',
        msg: '',
    })

    function handleChange(e:any){
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    return (
        <section id={s.containerContact}>
            <Nav></Nav>
            <h1>CONTACTO</h1>
            <form>
                {/* <input type='text' placeholder="Tu nombre" value={data.name} name="name" onChange={handleChange}/>
                <input type='text' placeholder="Tu apellido" value={data.lastname} name="lastname" onChange={handleChange}/> */}
                <textarea placeholder="Tu mensaje" value={data.msg} name="msg" onChange={handleChange}/>
            </form>
            <a href={`https://wa.me/${num}?text=${data.msg}`} target="_blank">
                <button>
                    Enviar mensaje a WhatsApp
                </button>
            </a>

        </section>
    )
}