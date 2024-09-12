import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import sequelize from '../config/db.js';
import dotenv from 'dotenv'

//variables de entorno, lo utilizo, env para no dejar a primera vista los datos de conexion
dotenv.config({path:'.env'})

export async function login(req, res) {
  const { correo_electronico, password } = req.body;

  try {
    // Consulta para obtener el usuario con el correo electrónico proporcionado
    const result = await sequelize.query(
      'SELECT idUsuarios, password FROM Usuarios WHERE correo_electronico = :correo_electronico',
      {
        replacements: { correo_electronico },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (result.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = result[0];

    // comparando contraseñas
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

      // Genera y firmar token
      const token = jwt.sign(
        { idUsuarios: user.idUsuarios, idRol: user.idRol }, 
        process.env.SECRET,
        { expiresIn: '24h' } 
      );

    
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    
  } catch (error) {
    console.error('Error en el proceso de login:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
}



// obtener el rol desde la base de datos
async function getRoleById(idRol) {
  try {
    console.log(`Consultando el rol con idRol: ${idRol}`);
    const result = await sequelize.query(
      'SELECT nombre FROM Rol WHERE idRol = :idRol',
      {
        replacements: { idRol },
        type: sequelize.QueryTypes.SELECT
      }
    );
    return result.length > 0 ? result[0].nombre : null;
  } catch (error) {
    console.error('Error al consultar el rol desde la base de datos:', error);
    throw new Error('Error al consultar el rol desde la base de datos');
  }
}

// Verificando roles permitidos
export function requireRoles(roles) {
  return async (req, res, next) => {
    try {
      const userRole = req.user.idRol;
      const roleName = await getRoleById(userRole);

      console.log(`Rol del usuario: ${roleName}`);
      console.log(`Roles permitidos: ${roles.join(', ')}`);

      if (!roleName) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }

      // Verifica si el rol del usuario esta en la lista de roles permitidos
      if (!roles.includes(roleName)) {
        return res.status(403).json({ message: 'Acceso denegado: No tienes el rol necesario' });
      }

      next();
    } catch (error) {
      console.error('Error al verificar los roles desde la base de datos:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
}
