import {Router} from 'express'
import { listarUsuarios, insertarUsuarios, actualizarUsuarios } from '../controllers/usuariosController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { adminRole, usuarioRole } from '../middleware/tokenMiddleware.js';

const router = Router();

router.get('/usuarios', authenticateToken, usuarioRole, listarUsuarios)

router.post('/usuarios',  insertarUsuarios)

router.put('/usuarios/:id', authenticateToken, usuarioRole, adminRole, actualizarUsuarios)

export default router;