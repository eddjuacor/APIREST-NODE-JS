import {Router} from 'express'

import { login } from "../middleware/tokenMiddleware.js";


const router = Router();

router.post('/login',  login)

export default router;