import {Router} from 'express'
import { insertarEstado, actualizarEstado } from '../controllers/estadoController.js';


const router = Router();


router.post('/Estados',  insertarEstado)

router.put('/Estados/:id', actualizarEstado)

export default router;