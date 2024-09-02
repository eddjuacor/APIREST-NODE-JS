import {Router} from 'express'

import { generarToken } from "../middleware/tokenMiddleware.js";


const router = Router();

router.post('/login',  generarToken)

export default router;