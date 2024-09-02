import {Router} from 'express'
import { listarUsuarios, insertarUsuarios, actualizarUsuarios } from '../controllers/usuariosController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';

const router = Router();

router.get('/usuarios', authenticateToken, listarUsuarios)

router.post('/usuarios',  insertarUsuarios)

router.put('/usuarios/:id', authenticateToken, actualizarUsuarios)

export default router;