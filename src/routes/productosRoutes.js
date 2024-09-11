import {Router} from 'express'
import { listarProductos, insertarProductos, actualizarProductos } from '../controllers/productosController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';


const router = Router();

router.get('/productos', authenticateToken,  listarProductos)

router.post('/productos', authenticateToken, insertarProductos)

router.put('/productos/:id', authenticateToken,  actualizarProductos)

export default router;