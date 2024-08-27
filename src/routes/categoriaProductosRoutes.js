import {Router} from 'express'
import { insertarCategoriaProductos, actualizarCategoriaProductos } from '../controllers/categoriaProductosController.js';


const router = Router();


router.post('/Categoriaproductos',  insertarCategoriaProductos)

router.put('/Categoriaproductos/:id', actualizarCategoriaProductos)

export default router;