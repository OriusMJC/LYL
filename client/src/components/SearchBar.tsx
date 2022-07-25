import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../config";
import { getVehiclesByName } from "../redux/actions";
import s from './Styles/SearchBar.module.css'

export default function SearchBar(){
    const dispatch = useAppDispatch()
    const [input,setInput] = useState('')

    function handleChange(event:any){
        setInput(event.target.value)
    }

    function handleSubmit(event:any){
        event.preventDefault()
        dispatch(getVehiclesByName(input))
    }

    return(
        <form onSubmit={handleSubmit} id={s.searchBarContainer}>
            <input value={input} onChange={handleChange}/>
            <button>Buscar</button>
        </form>
    )
}