import {Router} from 'express'
import { insertarOrdenDetalles, actualizarOrdenDetalles } from '../controllers/ordenDetallesController.js';

const router = Router();


router.post('/ordenDetalles', insertarOrdenDetalles)

router.put('/ordenDetalles/:id', actualizarOrdenDetalles)

export default router;