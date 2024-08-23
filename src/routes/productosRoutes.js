import {Router} from 'express'
import { actualizarProductos, getProductos, insertarProductos } from '../controllers/productosController.js';

const router = Router();

router.get('/productos', getProductos)

router.post('/productos', insertarProductos)

router.put('/productos/:id', actualizarProductos)

export default router;