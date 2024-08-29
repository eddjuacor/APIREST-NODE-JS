import jwt from "jsonwebtoken";
import sequelize from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

//aqui se configuro la palabra secreta en el .env, es un rquisito de jwt
const SECRET = process.env.SECRET;

//esta funcion genera un token con el cual vamos a privar nuestros endpoints
export async function GenerateToken(req, res) {
  const { idUsuarios, correo_electronico, password } = req.body;

  //aqui hacemos la consulta a la base de datos 
  await sequelize.query(
    `SELECT correo_electronico, password FROM Usuarios WHERE idUsuarios = :idUsuarios`,
    {
      replacements: { idUsuarios: idUsuarios, correo_electronico, password },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  const usuario = { correo_electronico: correo_electronico };

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
  const token = req.header("autorizacion");

  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next(); //aqui continumaos con el flujo 
  } catch (error) {
    res.status(400).json({ error: "token no es válido" });
  }
}
