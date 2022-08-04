import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../config"
import { loginUser } from "../redux/actions"
import { useVerfication } from "../services/services"
import Nav from "./Nav"
import s from './Styles/Login.module.css'

export default function Login(){
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [userData,setUserData] = useState({
        email: "",
        password: ""
    })
    const [msgError,setMsgError] = useState("")

    async function handleSubmit(event:any){
        event.preventDefault()
        console.log('mando')
        let resp = await dispatch(loginUser(userData))
        if(resp.data === 'Datos correctos'){
            window.localStorage.setItem('userDataLogin', JSON.stringify(userData))
            navigate("/admin/panel")
        }else{
            setMsgError("Datos ingresados incorrectos!")
        }
    }

    function handleChange(event:any){
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }
    // useVerfication('panel', false)
    useEffect(()=>{
        let data = window.localStorage.getItem("userDataLogin");
        let dataParse = data ? JSON.parse(data) : null
        if(dataParse && dataParse.email){
            navigate(`/admin/panel`)
        }
    },[])

    return(
        <section id={s.loginContainer}>
            <Nav/>
            <form onSubmit={handleSubmit} id={s.formLogin}>
                <label>Email:</label>
                <input name='email' type='text' value={userData.email} onChange={handleChange}/>
                <label>Password:</label>
                <input name='password' type='password' value={userData.password} onChange={handleChange}/>
                <button>Entrar</button>
            </form>
            <p>{msgError}</p>
        </section>
    )
}