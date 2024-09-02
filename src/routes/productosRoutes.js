import {Router} from 'express'
import { listarProductos, insertarProductos, actualizarProductos } from '../controllers/productosController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { adminRole, usuarioRole } from '../middleware/tokenMiddleware.js';

const router = Router();

router.get('/productos', authenticateToken, usuarioRole,  listarProductos)

router.post('/productos', authenticateToken, adminRole, insertarProductos)

router.put('/productos/:id', authenticateToken, adminRole, actualizarProductos)

export default router;