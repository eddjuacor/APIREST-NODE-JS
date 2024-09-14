import {Router} from 'express'
import { listarProductos,  actualizarProductos } from '../controllers/productosController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { requireRoles } from '../middleware/tokenMiddleware.js';
import { insertarProductos } from '../controllers/productosController.js';
import {upload}   from '../config/multer.js';


const router = Router();

router.get('/productos', authenticateToken, requireRoles([ 'Admin', 'Operador', 'Cliente']),  listarProductos)

router.post('/productos', authenticateToken, upload.single('foto'), insertarProductos)

router.put('/productos/:id', authenticateToken,requireRoles([ 'Admin', 'Operador']), actualizarProductos)

export default router;