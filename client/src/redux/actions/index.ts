import axios from "axios";
import { Dispatch } from "react";
import * as types from '../../types'

export const LOGIN = "LOGIN";
export const GET_ALL_VEHICLES = "GET_ALL_VEHICLES";
export const GET_VEHICLES_BY_NAME = "GET_VEHICLES_BY_NAME"
export const GET_DETAILS = "GET_DETAILS";
export const CREATE_VEHICLE = "CREATE_VEHICLE";
export const DELETE_VEHICLE = "DELETE_VEHICLE";
export const UPDATE_VEHICLE = "UPDATE_VEHICLE";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const CHANGE_PAGE = "CHANGE_PAGE"

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
};

export function getAllVehicles(){
    return async(dispatch: Dispatch<Action>)=>{
        try {
            let res = await axios('/vehicles');
            dispatch({type: GET_ALL_VEHICLES, payload: res.data})
        } catch (error) {
            console.log(error)
        }
    }
};

export function getVehiclesByName(name:string){
    return (dispatch: Dispatch<Action>)=>{
        dispatch({
            type: GET_VEHICLES_BY_NAME,
            payload: name
        })
    }
}

export function getDetails(idVehicle:string){
    return async(dispatch: Dispatch<Action>)=>{
        try {
            let res = await axios(`/vehicles/${idVehicle}`);
            dispatch({type: GET_DETAILS, payload: res.data})
        } catch (error) {
            console.log(error)
        }
    }
};

export function createVehicle(data:types.Vehicle){
    console.log(data);
    return async()=>{
        try {
            let res = await axios.post('/vehicles/create', data);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
};

export function deleteVehicle(idVehicle:string){
    return async(dispatch: Dispatch<Action>)=>{
        try {
            let res = await axios.delete(`/vehicles/${idVehicle}`);
            dispatch({type: DELETE_VEHICLE, payload: res.data});
        } catch (error) {
            console.log(error)
        }
    }
};

export function updateData(idVehicle:string, data:types.Vehicle){
    return async(dispatch: Dispatch<Action>)=>{
        try {
            let res = await axios.put(`/vehicles/${idVehicle}`, data);
            dispatch({type: UPDATE_VEHICLE, payload: res.data});
        } catch (error) {
            console.log(error)
        }
    }
};

export function orderByPrice(payload:any){
    return {
        type: ORDER_BY_PRICE,
        payload,
    }
}

export function changePage(page:number){
    return {
            type: CHANGE_PAGE,
            payload: page
        }
    }
