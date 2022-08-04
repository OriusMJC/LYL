export type NonSensitiveUserInfo = Pick<User, 'id','name','email','phone', 'admin'>
export type basicProductInfo = Pick<Products, 'id','title','photo','price'>
export type VehicleStatus = 'Nuevo' | 'Usado';
export type photo = {
    text: string,
    photo: any,
}


export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    phone: string,
};

export interface Vehicle {
    id: string,
    title: string,
    photo: Array<string>,
    price: number,
    status: VehicleStatus | string;
    description: string,
    kilom?: number,
    year: number,
}

export interface State{
    vehicles: Array<Vehicle>,
    allVehicles: Array<Vehicle>,
    vehicleDetails?: Object<Vehicle>,
}