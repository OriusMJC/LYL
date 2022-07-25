import * as actions from '../actions';
import * as types from '../../types';

function orderMayMen(){

};
function orderMenMay(){

};

const initialState:any = {
    vehicles: [],
    allVehicles: [],
    vehicleDetails: {},
    actualPage: 1,
}


export default function rootReducer(state = initialState, action:any){
    switch (action.type) {
        case actions.GET_ALL_VEHICLES:
            return{
                ...state,
                vehicles: action.payload,
                allVehicles: action.payload
            }
        case actions.GET_VEHICLES_BY_NAME:
            let vehiclesFiltered = [...state.allVehicles].filter(v => v.title.toLowerCase().includes(action.payload.toLowerCase()))
            return{
                ...state,
                vehicles: vehiclesFiltered,
            }
        case actions.GET_DETAILS:
            return {
                ...state,
                vehicleDetails: action.payload
            }
        case actions.DELETE_VEHICLE:
            let filtered:Array<types.Vehicle>= [];
            if(action.payload){
                filtered = state.vehicles.filter((v:types.Vehicle) => v.id !== action.payload.id)
            }
            return{
                ...state,
                vehicles: filtered,
            }
        case actions.CHANGE_PAGE:
            return {
                ...state,
                actualPage: action.payload
            }
        default:
            return state
    }
}