import {Router} from 'express'
import { insertarCategoriaProductos, actualizarCategoriaProductos } from '../controllers/categoriaProductosController.js';
import {authenticateToken} from '../controllers/authTokenController.js'

const router = Router();


router.post('/Categoriaproductos', authenticateToken,  insertarCategoriaProductos)

router.put('/Categoriaproductos/:id', authenticateToken, actualizarCategoriaProductos)

export default router;