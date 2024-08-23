import {Router} from 'express'
import { insertarProductos, actualizarProductos } from '../controllers/productosController.js';

const router = Router();


router.post('/productos', insertarProductos)

router.put('/productos/:id', actualizarProductos)

export default router;