import sequelize from "../config/db.js";
import bcrypt from "bcrypt";

export async function insertarUsuarios(req, res) {
  try {
    const sp_InsertarUsuarios = "sp_InsertarUsuarios"; // Nombre del procedimiento almacenado

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
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const match = await bcrypt.compare(password, hashedPassword);
    if(match) {
        console.log("password match")
    }

    const parametros = {
      replacements: {
        idEstados,
        idRol,
        correo_electronico,
        nombre_completo,
        password: hashedPassword,
        telefono,
        fecha_nacimiento,
      },
      type: sequelize.QueryTypes.SELECT,
    };

    await sequelize.query(
      `EXEC ${sp_InsertarUsuarios} :idEstados, :idRol, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento`,
      parametros
    );

    res.status(200).json({ message: 'Usuario ingresado correctamente' }); 
  } catch (error) {
    console.error("Error ejecutando el procedimiento almacenado:", error);
    res
      .status(500)
      .json({
        error: "Ocurrió un error al ejecutar el procedimiento almacenado",
      });
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
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const match = await bcrypt.compare(password, hashedPassword);
    if(match) {
        console.log("password match")
    }

    // Aqui armamos la consulta para el procedimiento almacenado
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

    // Aqui ejecturo el procedimiento almacenado
    await sequelize.query(sqlQuery, {
      replacements: {
        idUsuarios: idUsuarios,
        idEstados: idEstados,
        idRol: idRol,
        correo_electronico: correo_electronico,
        nombre_completo: nombre_completo,
        password: hashedPassword,
        telefono: telefono,
        fecha_nacimiento: fecha_nacimiento,
      },
    });

    res.status(200).json({ message: 'Usuario Actualizado correctamente' }); 
  } catch (error) {
    console.error("Error actualizando el Usuario:", error);
    res.status(500).json({ error: " error al actualizar el Usuario" });
  }
}
