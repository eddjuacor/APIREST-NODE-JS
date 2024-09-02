import jwt from 'jsonwebtoken';
import sequelize from '../config/db.js'; // El archivo de configuración de sequelize
import dotenv from 'dotenv'

//variables de entorno, lo utilizo, env para no dejar a primera vista los datos de conexion
dotenv.config({path:'.env'})

  export async function generarToken (req, res) {

  const { correo_electronico, password } = req.body;
 

  try {
    const result = await sequelize.query(
      'SELECT idUsuarios, correo_electronico, idRol FROM Usuarios WHERE correo_electronico = :correo_electronico AND password = :password',
      {
        replacements: {  correo_electronico, password },
        type: sequelize.QueryTypes.SELECT
      }
    );
    console.log(result)

    if (result.length > 0) {
      const user = { idUsuarios: result[0].idUsuarios, correo_electronico: result[0].correo_electronico, idRol: result[0].idRol};
      const accessToken = jwt.sign(user, process.env.SECRET, { expiresIn: '24h' });
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en /login:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export async function adminRole(req, res, next) {
 
    try {
      // `req.user` debería contener la información del usuario después de `authenticateToken`

      const idRol = req.user.idRol; // Rol obtenido del token
    
      // Consulta a la base de datos para obtener el nombre del rol (si es necesario)
      const result = await sequelize.query(
        'SELECT nombre, idRol FROM Rol WHERE idRol = idRol',
        {
          replacements: { idRol },
          type: sequelize.QueryTypes.SELECT
        }
      );
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }
  
      const rolDesdeDB = result[0].idRol; // Asumiendo que el campo es 'nombre'
  
      // Comparar el rol del token con 'Admin'
      if (rolDesdeDB !== req.user.idRol) {
        return res.status(403).json({ message: 'Acceso denegado: No tienes el rol de Admin' });
      }
  
      next(); // Si el rol es Admin, continúa al siguiente middleware o ruta
    } catch (error) {
      console.error('Error al verificar el rol de Admin desde la base de datos:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export async function usuarioRole(req, res, next) {
 
  try {

    const idRol = req.user.idRol; // Rol obtenido del token
  
    // Consulta a la base de datos para obtener el nombre del rol (si es necesario)
    const result = await sequelize.query(
      'SELECT nombre, idRol FROM Rol WHERE idRol = idRol',
      {
        replacements: { idRol },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    const rolDesdeDB = result[1].idRol;

    // Comparar el rol del token con 'Usuario'
    if (rolDesdeDB !== req.user.idRol) {
      return res.status(403).json({ message: 'Acceso denegado: No tienes el rol de Usuario' });
    }

    next(); // Si el rol es Usuario, continúa al siguiente middleware o ruta
  } catch (error) {
    console.error('Error al verificar el rol de Admin desde la base de datos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};










