import {Router} from 'express'
const router = Router();
import {GenerateToken} from '../middleware/authTokenMiddleware.js'


router.post('/login', GenerateToken )

export default router