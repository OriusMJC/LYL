export type NonSensitiveUserInfo = Pick<User, 'id','name','email','phone', 'admin'>
export type basicProductInfo = Pick<Products, 'id','title','photo','price'>
export type VehicleStatus = 'Nuevo' | 'Usado';


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
    status: VehicleStatus;
    description: string,
    kilom: number,
    year: number,
}