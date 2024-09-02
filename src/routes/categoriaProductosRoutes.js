import {Router} from 'express'
import { listarCategoriaProductos, insertarCategoriaProductos, actualizarCategoriaProductos } from '../controllers/categoriaProductosController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { adminRole, usuarioRole } from '../middleware/tokenMiddleware.js';


const router = Router();

router.get('/Categoriaproductos',  authenticateToken, usuarioRole, listarCategoriaProductos)

router.post('/Categoriaproductos', authenticateToken, adminRole,  insertarCategoriaProductos)

router.put('/Categoriaproductos/:id', authenticateToken, adminRole, actualizarCategoriaProductos)

export default router;