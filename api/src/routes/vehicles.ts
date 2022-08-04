import { Router } from 'express';
import {
    getAllVehicles,
    getVehiclesById,
    addNewVehicle,
    deleteVehicle,
    updateData,
} from '../services/vehicleSettings';
import cloudinary from '../services/cloudinarySettings';

const router = Router();

router.get('/', async(_req, res, next): Promise<any> =>{
    try {
        let allCars = await getAllVehicles()
        res.json(allCars)
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async(req, res, next): Promise<any> => {
    const id = req.params.id;
    try {
        let vehicleById = await getVehiclesById(id);
        return res.json(vehicleById);
    } catch (error) {
        next(error);
    }
});

router.post('/create', async(req, res, next): Promise<any> => {
    let arr:any = []
    const photos = req.body.photo
    const vehicle = req.body;
    photos.map(async(p:any) => {
        await cloudinary.uploader.upload(p, (error:any, result:any) => {
            if(!error){
                arr.push(result.url)
            }else{
                console.log(error);
            }
        })
    })
    const product = {
        ...vehicle,
        photos: arr
    }
    try {
        let resp = await addNewVehicle(product);
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

router.put('/edit/:idVehicle', async(req, res, next): Promise<any>=>{
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