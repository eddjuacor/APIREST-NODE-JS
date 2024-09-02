import sequelize from "../config/db.js";

//funcion para listar las categorias de los productos

export const listarEstados = async (req, res) => {
  try {
      const estados = await sequelize.query(
          `SELECT * FROM Estados`, // Consulta SQL directa
          {
              type: sequelize.QueryTypes.SELECT // Especifica el tipo de consulta
          }
      );

      res.status(200).json(estados); // Devuelve las categorías en formato JSON
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener los estados', error: error.message });
  }
};


//funcion para ejecutar el procedimiento almacenado para insertar insertarEstado
export async function insertarEstado(req, res) {
  try {

    // Nombre del procedimiento almacenado
    const sp_Estados = "sp_Estados"; 

   //informacion que el cliente nos envia desde el frontend
    const { nombre } = req.body;

    //esto nos facilita la interaccion con la base de datos
    const parametros = {
      replacements: {
        nombre,
      },
      type: sequelize.QueryTypes.SELECT,
    };

    //Ejecutamos el procedimiento almacenado con los campos con los que vamos a interactuar
      await sequelize.query(
      `EXEC ${sp_Estados} :nombre`,
      parametros
    );

    
    res.status(200).json({ message: 'Estado ingresado correctamente' });  
  } catch (error) {
    console.error("Error ejecutando el procedimiento almacenado:", error);
    res.status(500).json({
        error: "Ocurrió un error al ejecutar el procedimiento almacenado",
      });
  }
}

/*----------------procedimiento almacenado para actualizar--------------------------------*/

//funcion para ejecutar el procedimiento almacenado para actualizar Estado

export async function actualizarEstado(req, res) {
  try {

     //recibimos del cliente el id del producto que vamos a actualizar
    const idEstados = req.params.id;

     //informacion que el cliente nos envia desde el frontend
    const { nombre } = req.body;

    // Aqui armamos la consulta para el procedimiento almacenado
    const sqlQuery = `
          EXEC [sp_UpdateEstados] 
            @idEstados = :idEstados,
            @nombre = :nombre
        `;

    // aqui sustituimos los marcadores de posicion en la consulta sql
    await sequelize.query(sqlQuery, {
      replacements: {
        idEstados: idEstados,
        nombre: nombre,
      },
    });

    res.status(200).json({ message: 'Estado actualizado correctamente' }); 
  } catch (error) {
    res.status(500).json({ error: " error al actualizar el produccto" });
  }
}
