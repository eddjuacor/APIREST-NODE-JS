import sequelize from "../config/db.js";
import bcrypt from "bcrypt";



export const listarUsuarios = async (req, res) => {
  try {
      const usuarios = await sequelize.query(
          `SELECT * FROM Usuarios`, // Consulta SQL directa
          {
              type: sequelize.QueryTypes.SELECT // Especifica el tipo de consulta
          }
      );

      res.status(200).json(usuarios); // Devuelve las categorías en formato JSON
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};



// Función para insertar usuarios
export async function insertarUsuarios(req, res) {
  try {
    const {
      idEstados,
      idRol,
      correo_electronico,
      nombre_completo,
      password,
      telefono,
      fecha_nacimiento,
    } = req.body;

    // Validaciones básicas
    if (!correo_electronico || !password) {
      return res.status(400).json({ message: 'Correo electrónico y contraseña son obligatorios' });
    }

    // Validación del formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo_electronico)) {
      return res.status(400).json({ message: 'Formato de correo electrónico inválido' });
    }

    // Validación de la contraseña (puedes ajustar según requisitos específicos)
    if (password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Parámetros para el procedimiento almacenado
    const parametros = {
      idEstados,
      idRol,
      correo_electronico,
      nombre_completo,
      password: hashedPassword,
      telefono,
      fecha_nacimiento
    };

    // Ejecución del procedimiento almacenado
    await sequelize.query(
      `EXEC sp_InsertarUsuarios @idEstados = :idEstados, @idRol = :idRol, @correo_electronico = :correo_electronico, @nombre_completo = :nombre_completo, @password = :password, @telefono = :telefono, @fecha_nacimiento = :fecha_nacimiento`,
      { replacements: parametros }
    );

    res.status(200).json({ message: 'Usuario ingresado correctamente' });
  } catch (error) {
    // Manejo de errores
    console.error("Error ejecutando el procedimiento almacenado:", error);
    res.status(500).json({ message: "Ocurrió un error al ejecutar el procedimiento almacenado", error: error.message });
  }
}

//procedimiento almacenado para actualizar
export async function actualizarUsuarios(req, res) {
  try {
    const idUsuarios = req.params.id;
    const {
      idEstados,
      idRol,
      correo_electronico,
      nombre_completo,
      password,
      telefono,
      fecha_nacimiento,
    } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sqlQuery = `
      EXEC sp_UpdateUsuarios 
        @idUsuarios = :idUsuarios,
        @idEstados = :idEstados,
        @idRol = :idRol,
        @correo_electronico = :correo_electronico,
        @nombre_completo = :nombre_completo,
        @password = :password,
        @telefono = :telefono,
        @fecha_nacimiento = :fecha_nacimiento
    `;

    await sequelize.query(sqlQuery, {
      replacements: {
        idUsuarios,
        idEstados,
        idRol,
        correo_electronico,
        nombre_completo,
        password: hashedPassword,
        telefono,
        fecha_nacimiento,
      },
    });

    res.status(200).json({ message: 'Usuario actualizado correctamente' }); 
  } catch (error) {
    console.error("Error actualizando el Usuario:", error);
    res.status(500).json({ error: "Error al actualizar el Usuario" });
  }
}