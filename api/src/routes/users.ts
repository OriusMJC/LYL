// import express from 'express';
require('dotenv').config();
import { Router } from 'express';
// import {
//     getAllUsers,
//     getUserById,
//     getBasicUserInfo,
//     addNewUser,
// } from '../services/userSettings';
// import * as types from '../types';
const {EMAIL,PASSWORD} = process.env

const router = Router();

router.get('/', (req, res, next): Object | undefined | void=> {
    const {email,password} = req.query
    try {
        if(email === EMAIL && password === PASSWORD){
            return res.send('Datos correctos')
        }
        return res.send('Datos incorrectos');
    } catch (error) {
        return next(error)
    }
});

// router.get('/:idUser', async(req, res) =>{
//     const id = req.params.idUser;
//     try {
//         const userById = await getUserById(id);
//         res.json(userById);
//     } catch (error) {
//         res.status(404).json({msg: 'User not found'});
//     }
// });

// router.post('/newUser')

module.exports = router;