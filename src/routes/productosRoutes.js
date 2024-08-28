import {Router} from 'express'
import { insertarProductos, actualizarProductos } from '../controllers/productosController.js';
import {authenticateToken} from '../controllers/authTokenController.js'

const router = Router();


router.post('/productos', authenticateToken, insertarProductos)

router.put('/productos/:id', authenticateToken, actualizarProductos)

export default router;