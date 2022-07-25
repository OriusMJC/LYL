import * as types from '../types';
const { User } = require('../db');
const { DB_EMAIL } = process.env;

export const getAllUsers = async(): Promise<types.User[]> => {
    let allUsers = await User.findAll();
    return allUsers;
};

export const getUserById = async(id: string): Promise<types.User | string> => {
    if(id){
        let user = User.findByPk(id);
        return user;
    }
    return 'No se ha encontrado ningun usuario con ese id';
};

export const getBasicUserInfo = async(id: string): Promise<types.NonSensitiveUserInfo | string> =>{
    let userData = await User.findByPk(id);
    if(userData){
        const user = {
            id: userData.dataValues.id,
            name: userData.dataValues.name,
            email: userData.dataValues.email,
            phone: userData.dataValues.phone,
            admin: userData.dataVaules.admin,
        };
        return user;
    }
};

export const addNewUser = async(user: types.User): Promise<string> => {
    if(user.email === DB_EMAIL){
        await User.create({...user, admin:true});
    }else {
        await User.create(user);
    }
    return 'Usuario guardado con exito';
}