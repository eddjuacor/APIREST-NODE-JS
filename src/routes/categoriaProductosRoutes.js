import {Router} from 'express'
import { insertarCategoriaProductos, actualizarCategoriaProductos } from '../controllers/categoriaProductosController.js';
import {authenticateToken} from '../middleware/authTokenMiddleware.js'
import {autorizacionRol} from '../middleware/rolMiddleware.js'

const router = Router();


router.post('/Categoriaproductos', authenticateToken,  insertarCategoriaProductos)

router.put('/Categoriaproductos/:id', authenticateToken, autorizacionRol('Admin'), actualizarCategoriaProductos)

export default router;