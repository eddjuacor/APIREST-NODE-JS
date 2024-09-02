import {Router} from 'express'
import { listarOrdenes, crearOrden, ordenUpdate  } from '../controllers/ordenDetalleController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { adminRole, usuarioRole } from '../middleware/tokenMiddleware.js';

const router = Router();

router.get('/ordenDetalles', authenticateToken, usuarioRole, listarOrdenes)

router.post('/ordenDetalles', authenticateToken, adminRole,  crearOrden )

router.put('/ordenDetalles/:id', authenticateToken, adminRole, ordenUpdate)

export default router;