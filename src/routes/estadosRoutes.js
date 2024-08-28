import {Router} from 'express'
import { insertarEstado, actualizarEstado } from '../controllers/estadoController.js';
import {authenticateToken} from '../controllers/authTokenController.js'



const router = Router();


router.post('/Estados', authenticateToken, insertarEstado)

router.put('/Estados/:id', authenticateToken,  actualizarEstado)

export default router;