import * as types from '../types';
const { Vehicle } = require('../db');

export const getAllVehicles = async(): Promise<types.Vehicle[] | string> => {
    let allVehicles = await Vehicle.findAll();
    if(!allVehicles.length) return 'No hay vehiculos creados aun';
    return allVehicles;
};

export const getVehiclesById = async(idVehicle:string): Promise<types.Vehicle | string> => {
    let vehicle = await Vehicle.findByPk(idVehicle);
    if(!vehicle.dataValues) return 'No se encontro ningun vehiculo';
    return {...vehicle.dataValues};
};

export const getVehicleByName = async(vehicleTitle: string): Promise<types.Vehicle[] | string> => {
    let allVehicles = await Vehicle.findAll();
    let vehicleFind = allVehicles.filter((v:types.Vehicle) => v.title.toLowerCase().includes(vehicleTitle.toLowerCase()));
    if(!vehicleFind.length) return 'No se encontro ningun vehiculo con ese nombre';
    return vehicleFind;
};

export const addNewVehicle = async(userData: types.NonSensitiveUserInfo, newVehicle: types.Vehicle): Promise<string> => {
    let vehicleToCreate = null;
    if(userData.admin){
        vehicleToCreate = {...newVehicle};
        Vehicle.create(vehicleToCreate);
        return 'Vehiculo posteado con exito';
    }else return 'No puede crear un vehiculo si no es admin'
};

export const deleteVehicle = async(idVehicle: string): Promise<string> => {
    await Vehicle.destroy({where: {id: idVehicle}});
    return 'Vehiculo eliminado';
};

export const updateData = async(idVehicle: string, newData: types.Vehicle): Promise<string> => {
    await Vehicle.update(newData, {where: {id: idVehicle}});
    return 'Cambios actualizados';
}