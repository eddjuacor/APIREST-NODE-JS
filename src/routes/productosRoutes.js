import {Router} from 'express'
import { listarProductos, insertarProductos, actualizarProductos } from '../controllers/productosController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { requireRoles } from '../middleware/tokenMiddleware.js';

const router = Router();

router.get('/productos', authenticateToken, requireRoles([ 'Admin', 'Operador', 'Cliente']),  listarProductos)

router.post('/productos', authenticateToken, requireRoles([ 'Admin', 'Operador']), insertarProductos)

router.put('/productos/:id', authenticateToken,requireRoles([ 'Admin', 'Operador']), actualizarProductos)

export default router;