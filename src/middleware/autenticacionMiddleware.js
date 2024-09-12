import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'


//variables de entorno, lo utilizo, env para no dejar a primera vista los datos de conexion
dotenv.config({path:'.env'})


export async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    req.user = user;
    next();
  });
}



