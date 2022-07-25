import { useNavigate } from "react-router-dom";


export function useVerfication(dir:string,panel:boolean){
    const navigate = useNavigate()
    let data = window.localStorage.getItem("userDataLogin");
    let dataParse = data ? JSON.parse(data) : null
    if(dataParse && dataParse.email && !panel){
        navigate(`/admin/${dir}`)
    }else if(panel){
        navigate(`/admin/login`)
    }
}