import axios from "axios";
import { Dispatch } from "react";

export const LOGIN = "LOGIN"


type Action = {
	type: string;
	payload: any;
};

export function loginUser(dataUser:object){
    return async (dispatch: Dispatch<Action>)=>{
        try {
            let resp = await axios('/users', {params: dataUser})
            if(resp.data == 'Datos correctos'){
                    dispatch({
                        type: LOGIN,
                        payload: dataUser
                    })
            }
            return resp
        } catch (error) {
            console.log(error)
        }
    }
}