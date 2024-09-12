import {Router} from 'express'
import { listarUsuarios, insertarUsuarios, actualizarUsuarios } from '../controllers/usuariosController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { requireRoles } from '../middleware/tokenMiddleware.js';

const router = Router();

router.get('/usuarios', authenticateToken, requireRoles([ 'Admin', 'Operador']), listarUsuarios)

router.post('/usuarios',  insertarUsuarios)

router.put('/usuarios/:id', authenticateToken, requireRoles([ 'Admin', 'Operador']), actualizarUsuarios)

export default router;