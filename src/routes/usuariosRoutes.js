import {Router} from 'express'
import { actualizarEstado, getEstados, insertarEstado } from '../controllers/estadosController.js';

const router = Router();

router.get('/estados', getEstados)

router.post('/estados', insertarEstado)

router.put('/estados/:id', actualizarEstado)

export default router;