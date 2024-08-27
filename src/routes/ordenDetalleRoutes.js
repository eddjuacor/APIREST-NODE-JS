import {Router} from 'express'
import { insertarOrdenDetalles, actualizarOrdenDetalle } from '../controllers/ordenDetallesController.js';

const router = Router();


router.post('/ordenDetalles', insertarOrdenDetalles)

router.post('ordenDetalles/:id', actualizarOrdenDetalle)

export default router;