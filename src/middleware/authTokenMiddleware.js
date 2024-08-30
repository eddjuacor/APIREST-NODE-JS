import jwt from "jsonwebtoken";
import sequelize from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

//aqui se configuro la palabra secreta en el .env, es un rquisito de jwt
const SECRET = process.env.SECRET;

//esta funcion genera un token con el cual vamos a privar nuestros endpoints
  export async function GenerateToken(req, res) {

  const { nombre_completo, correo_electronico } = req.body;

  //aqui hacemos la consulta a la base de datos 
  await sequelize.query(
    `SELECT correo_electronico, nombre_completo FROM Usuarios`,
    {
      replacements: { nombre_completo, correo_electronico },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  const usuario = {nombre_completo:nombre_completo, correo_electronico: correo_electronico  };

  const accessToken = generateAccessToken(usuario);

  res.header("authorization", accessToken).json({
    message: "usuario autenticado",
    token: accessToken,
  });
}

//en esta funcion es donde se firma el token
function generateAccessToken(usuario) {
  return jwt.sign(usuario, SECRET, { expiresIn: "24h" });
}


//esta funcion es el middleware que vamos a utilizar para privatizar nuestros endpoints
export function authenticateToken(req, res, next) {
  const authHeader = req.header("autorizacion");
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next(); //aqui continumaos con el flujo 
  } catch (error) {
    res.status(400).json({ error: "token no es válido" });
  }
}
