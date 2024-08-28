import {Router} from 'express'
import { insertarOrdenDetalles, actualizarOrdenDetalle } from '../controllers/ordenDetallesController.js';
import {authenticateToken} from '../controllers/authTokenController.js'

const router = Router();


router.post('/ordenDetalles', authenticateToken, insertarOrdenDetalles)

router.put('/ordenDetalles/:id', authenticateToken,  actualizarOrdenDetalle)

export default router;