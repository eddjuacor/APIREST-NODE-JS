import {Router} from 'express'
import { insertarOrdenDetalleFinal, actualizarOrdenDetalleFinal } from '../controllers/ordenDetalleFinalController.js';
import {authenticateToken} from '../middleware/authTokenMiddleware.js'

const router = Router();


router.post('/ordenDetalleFinal', authenticateToken, insertarOrdenDetalleFinal)

router.put('/ordenDetalleFinal/:id', authenticateToken,  actualizarOrdenDetalleFinal)

export default router;