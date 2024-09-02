import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'


//variables de entorno, lo utilizo, env para no dejar a primera vista los datos de conexion
dotenv.config({path:'.env'})


export async function authenticateToken (req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });

};




