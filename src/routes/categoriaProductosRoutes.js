import {Router} from 'express'
import { listarCategoriaProductos, insertarCategoriaProductos, actualizarCategoriaProductos } from '../controllers/categoriaProductosController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { requireRoles } from '../middleware/tokenMiddleware.js';



const router = Router();

router.get('/Categoriaproductos',  authenticateToken, requireRoles([ 'Admin', 'Operador']), listarCategoriaProductos)

router.post('/Categoriaproductos', authenticateToken, requireRoles([ 'Admin', 'Operador']),  insertarCategoriaProductos)

router.put('/Categoriaproductos/:id', authenticateToken,requireRoles([ 'Admin', 'Operador']), actualizarCategoriaProductos)

export default router;