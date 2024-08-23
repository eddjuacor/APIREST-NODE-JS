import {Router} from 'express'
import { insertarUsuarios, actualizarUsuarios } from '../controllers/usuariosController.js';

const router = Router();


router.post('/usuarios', insertarUsuarios)

router.put('/usuarios/:id', actualizarUsuarios)

export default router;