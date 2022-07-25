import { Router } from 'express';
import {
    getAllVehicles,
    getVehiclesById,
    getVehicleByName,
    addNewVehicle,
    deleteVehicle,
    updateData,
} from '../services/vehicleSettings';
import { getBasicUserInfo } from '../services/userSettings';
const router = Router();

router.get('/', async(req, res, next): Promise<any> =>{
    const { name } = req.query;
    try {
        if(!name){
            let allVehicles = await getAllVehicles();
            return res.json(allVehicles);
        }else {
            let vehicleByName = await getVehicleByName(name.toString());
            return res.json(vehicleByName);
        }
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async(req, res, next):Promise<any> => {
    const id = req.params.id;
    try {
        let vehicleById = await getVehiclesById(id);
        return res.json(vehicleById);
    } catch (error) {
        next(error);
    }
});

router.post('/:idUser', async(req, res, next):Promise<any> => {
    const id = req.params.idUser;
    const vehicle = req.body;
    try {
        const userData = await getBasicUserInfo(id);
        let resp = await addNewVehicle(userData, vehicle);
        return res.json(resp);
    } catch (error) {
        next(error)
    }
});

router.delete('/:idVehicle', async(req, res, next): Promise<any> => {
    const idVehicle = req.params.idVehicle;
    try {
        let resp = await deleteVehicle(idVehicle);
        return res.json(resp);        
    } catch (error) {
        next(error)
    }
});

router.put('/:idVehicle', async(req, res, next): Promise<any>=>{
    const idVehicle = req.params.idVehicle;
    const newData = req.body;
    try {
        let response = await updateData(idVehicle, newData);
        return res.json(response);
    } catch (error) {
        next(error)
    }
})

module.exports = router;