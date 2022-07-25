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
}


export default function rootReducer(state = initialState, action:any){
    switch (action.type) {
        case actions.GET_ALL_VEHICLES:
            return{
                ...state,
                vehicles: action.payload,
                allVehicles: action.payload
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
    }
}