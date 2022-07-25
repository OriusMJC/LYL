import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../config"
import { loginUser } from "../redux/actions"

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
            
        }
    }

    function handleChange(event:any){
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }

    return(
        <section>
            <form onSubmit={handleSubmit}>
                <input name='email' type='text' value={userData.email} onChange={handleChange}/>
                <input name='password' type='password' value={userData.password} onChange={handleChange}/>
                <button>Enviar</button>
            </form>
        </section>
    )
}