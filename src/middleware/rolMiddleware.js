
import sequelize from "../config/db.js";

export const autorizacionRol = (Admin) => {

    return async (req, res, next) => {

      try {

      
        const idUsuarios = req.user.id;

        console.log( idUsuarios);
        
        // Consulta para obtener el rol del usuario
        const results = await sequelize.query(`
          SELECT r.nombre
          FROM Usuarios u
          JOIN Rol r ON u.idRol = r.idRol
          WHERE u.idUsuarios = :idUsuarios
        `, {
          replacements: { idUsuarios },
          type: sequelize.QueryTypes.SELECT
        });

        if (!Array.isArray(results)) {
          return res.status(500).json({ message: 'Unexpected results format' });
        }
        
        const roles = results.map(row => row.nombre);
        if (roles.includes(Admin)) {
          next();
        } else {
          res.status(403).json({ message: 'Forbidden' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    };
   
  };

