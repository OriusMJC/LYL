import express from 'express';
import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    getBasicUserInfo,
    addNewUser,
} from '../services/userSettings';
import * as types from '../types';

const router = Router();

router.get('/', async(_req, res, next) => {
    try {
        const users:Array<types.User> = await getAllUsers();
        res.json(users);
    } catch (error) {
        next(error)
    }
});

router.get('/:idUser', async(req, res) =>{
    const id = req.params.idUser;
    try {
        const userById = await getUserById(id);
        res.json(userById);
    } catch (error) {
        res.status(404).json({msg: 'User not found'});
    }
});

// router.post('/newUser')

module.exports = router;