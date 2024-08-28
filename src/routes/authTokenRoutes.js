import {Router} from 'express'
const router = Router();
import {GenerateToken} from '../controllers/authTokenController.js'


router.post('/login', GenerateToken )

export default router