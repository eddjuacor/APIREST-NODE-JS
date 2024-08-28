import {Router} from 'express'
import jwt from 'jsonwebtoken'
import sequelize from '../config/db.js'
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET;

const router = Router();


router.post('/login', async (req, res) =>{
    const {idUsuarios, correo_electronico} = req.body;

    //consultar la base de datos
    await sequelize.query(
        `SELECT correo_electronico FROM Usuarios WHERE idUsuarios = :idUsuarios`, 
        {
          replacements: {idUsuarios:idUsuarios, correo_electronico },
          type: sequelize.QueryTypes.SELECT
        }
      );

    const usuario = {correo_electronico: correo_electronico}

    const accessToken = generateAccessToken(usuario);

    res.header('authorization', accessToken).json({
        message: 'usuario autenticado',
        token: accessToken
    });

})

function generateAccessToken(usuario){
    return jwt.sign(usuario, SECRET, {expiresIn: '24h'} )
}


export function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).send({ error: "Authorization header missing" });
    }
  
    const token = authHeader.split(' ')[1]; // El token se espera en el formato 'Bearer TOKEN'
  
    try {
      const payload = jwt.verify(token, SECRET);
  
      if (Date.now() / 1000 > payload.exp) {
        return res.status(401).send({ error: "Token expired" });
      }
  
      // Adjuntar la información del usuario a la solicitud para usarla en los siguientes controladores
      req.usuario = payload;
      next(); // Pasar al siguiente middleware o endpoint
    } catch (error) {
      res.status(401).send({ error: "Invalid token" });
    }
  }

export default router