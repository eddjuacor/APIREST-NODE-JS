import {Router} from 'express'
import { ordenesPorUsuario } from '../controllers/ordenDetalleController.js';
import { authenticateToken}  from '../middleware/autenticacionMiddleware.js';


const router = Router();

router.get('/ordenesporusuario/:idUsuarios', authenticateToken,   ordenesPorUsuario)


export default router;