import {Router} from 'express'
import { listarEstados, insertarEstado, actualizarEstado } from '../controllers/estadoController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { usuarioRole } from '../middleware/tokenMiddleware.js';



const router = Router();

router.get('/Estados', authenticateToken, usuarioRole, listarEstados)

router.post('/Estados', authenticateToken,  insertarEstado)

router.put('/Estados/:id', authenticateToken, actualizarEstado)

export default router;