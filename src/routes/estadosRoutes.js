import {Router} from 'express'
import { listarEstados, insertarEstado, actualizarEstado } from '../controllers/estadoController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { requireRoles } from '../middleware/tokenMiddleware.js';



const router = Router();

router.get('/Estados', authenticateToken, requireRoles([ 'Admin', 'Operador']), listarEstados)

router.post('/Estados', authenticateToken,requireRoles([ 'Admin', 'Operador']),insertarEstado)

router.put('/Estados/:id', authenticateToken, requireRoles([ 'Admin', 'Operador']), actualizarEstado)

export default router;