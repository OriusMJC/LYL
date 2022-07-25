import axios from "axios";
import { Dispatch } from "react";

export const LOGIN = "LOGIN"


type Action = {
	type: string;
	payload: any;
};

export function Login(dataUser:object){
    return async (dispatch: Dispatch<Action>)=>{
        try {
            let resp = await axios('/user',dataUser)
            // if(resp === 'Datos correctos'){
            //         // dispatch({
            //         //     type: LOGIN,
            //         //     payload: dataUser
            //         // })
            // }
        } catch (error) {
            console.log(error)
        }
    }
}