import {Router} from 'express'
import { listarOrdenes, listarOrden, crearOrden, ordenUpdate  } from '../controllers/ordenDetalleController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { requireRoles } from '../middleware/tokenMiddleware.js';

const router = Router();

router.get('/ordenDetalles', authenticateToken, requireRoles([ 'Admin', 'Operador']),  listarOrdenes)

router.get('/ordenDetalles/:idOrden', authenticateToken, requireRoles([ 'Admin', 'Operador']),  listarOrden)

router.post('/ordenDetalles', authenticateToken, requireRoles([ 'Admin', 'Operador']),  crearOrden )

router.put('/ordenDetalles/:id', authenticateToken, requireRoles([ 'Admin', 'Operador']), ordenUpdate)

export default router;