import {Router} from 'express'


import {authToken, generateToken} from '../controllers/authController.js'


import dotenv from 'dotenv'
dotenv.config({path:'.env'})

const router = Router();


router.post('/login', generateToken);

router.get('/private', authToken )

export default router;