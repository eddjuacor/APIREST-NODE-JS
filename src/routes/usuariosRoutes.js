import {Router} from 'express'
import { insertarUsuarios, actualizarUsuarios } from '../controllers/usuariosController.js';
import {authenticateToken} from '../middleware/authTokenMiddleware.js'

const router = Router();

router.post('/usuarios',  insertarUsuarios)

router.put('/usuarios/:id', authenticateToken, actualizarUsuarios)

export default router;