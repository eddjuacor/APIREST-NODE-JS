import {Router} from 'express'
import { insertarUsuarios, actualizarUsuarios } from '../controllers/usuariosController.js';
import {authenticateToken} from '../controllers/authTokenController.js'

const router = Router();

router.post('/usuarios', authenticateToken, insertarUsuarios)

router.put('/usuarios/:id', authenticateToken, actualizarUsuarios)

export default router;