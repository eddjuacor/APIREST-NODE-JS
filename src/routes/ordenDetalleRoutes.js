import {Router} from 'express'
import { listarOrdenes, crearOrden, ordenUpdate  } from '../controllers/ordenDetalleController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';

const router = Router();

router.get('/ordenDetalles', authenticateToken, listarOrdenes)

router.post('/ordenDetalles', authenticateToken,  crearOrden )

router.put('/ordenDetalles/:id', authenticateToken, ordenUpdate)

export default router;