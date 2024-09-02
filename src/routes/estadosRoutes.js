import {Router} from 'express'
import { listarEstados, insertarEstado, actualizarEstado } from '../controllers/estadoController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';
import { adminRole, usuarioRole } from '../middleware/tokenMiddleware.js';



const router = Router();

router.get('/Estados', authenticateToken,  usuarioRole, listarEstados)

router.post('/Estados', authenticateToken, adminRole, insertarEstado)

router.put('/Estados/:id', authenticateToken, adminRole, actualizarEstado)

export default router;