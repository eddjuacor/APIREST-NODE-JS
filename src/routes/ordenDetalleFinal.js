import {Router} from 'express'
import { insertarOrdenDetalleFinal, actualizarOrdenDetalleFinal } from '../controllers/ordenDetalleFinalController.js';
import {authenticateToken} from '../controllers/authTokenController.js'

const router = Router();


router.post('/ordenDetalleFinal', authenticateToken, insertarOrdenDetalleFinal)

router.put('/ordenDetalleFinal/:id', authenticateToken,  actualizarOrdenDetalleFinal)

export default router;