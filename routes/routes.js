import express from 'express';
import { getRegister, postRegister } from '../controllers/register.js';
import { getLogin, postLogin } from '../controllers/login.js';
import { getDashboard } from '../controllers/dashboard.js';
import { logout } from '../controllers/logout.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get('/', getRegister);
router.post('/', postRegister);

router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/dashboard', isAuthenticated, getDashboard);

router.get('/logout', logout);


export default router;
