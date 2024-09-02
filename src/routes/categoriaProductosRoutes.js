import {Router} from 'express'
import { listarCategoriaProductos, insertarCategoriaProductos, actualizarCategoriaProductos } from '../controllers/categoriaProductosController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { adminRole } from '../middleware/tokenMiddleware.js';


const router = Router();

router.get('/Categoriaproductos',  authenticateToken, adminRole, listarCategoriaProductos)

router.post('/Categoriaproductos', authenticateToken, insertarCategoriaProductos)

router.put('/Categoriaproductos/:id', authenticateToken,  actualizarCategoriaProductos)

export default router;