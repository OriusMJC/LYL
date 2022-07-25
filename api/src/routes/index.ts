import { Router} from 'express';
const users = require('./users');
const vehicles = require('./vehicles');

const router = Router();

router.use('/users', users);
router.use('/vehicles', vehicles)

module.exports = router;