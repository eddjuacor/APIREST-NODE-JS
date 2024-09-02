import sequelize from "../config/db.js";

//funcion para listar las categorias de los productos

export const listarCategoriaProductos = async (req, res) => {
  try {
      const categorias = await sequelize.query(
          `SELECT * FROM categoriaProductos`, // Consulta SQL directa
          {
              type: sequelize.QueryTypes.SELECT // Especifica el tipo de consulta
          }
      );

      res.status(200).json(categorias); // Devuelve las categorías en formato JSON
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener las categorías de productos', error: error.message });
  }
};




//funcion para ejecutar el procedimiento almacenado para insertar productos
export async function insertarCategoriaProductos(req, res) {
  try {
    //nombre del procedimiento almacenado
    const sp_InsertarCategoriaProductos = "sp_InsertarCategoriaProductos"; // Nombre del procedimiento almacenado

    //informacion que el cliente nos envia desde el frontend
    const { idUsuarios, nombre, idEstados } = req.body;

    //esto nos facilita la interaccion con la base de datos
    const parametros = {
      replacements: {
        idUsuarios,
        nombre,
        idEstados,
      },
      type: sequelize.QueryTypes.SELECT,
    };

    //Ejecutamos el procedimiento almacenado con los campos con los que vamos a interactuar
       await sequelize.query(
      `EXEC ${sp_InsertarCategoriaProductos} :idUsuarios, :nombre, :idEstados`,
      parametros
    );

   
    res.status(200).json({ message: 'Categoria ingresada correctamente' }); 
  } catch (error) {
    console.error("Error ejecutando el procedimiento almacenado:", error);
    res.status(500).json({
        error: "Ocurrió un error al ejecutar el procedimiento almacenado",
      });
  }
}

/*----------------procedimiento almacenado para actualizar--------------------------------*/

//Ejecutamos el procedimiento almacenado para actualizar un producto
export async function actualizarCategoriaProductos(req, res) {
  try {

    //recibimos del cliente el id del producto que vamos a actualizar
    const idCategoriaProductos = req.params.id;

    //informacion que el cliente nos envia desde el frontend
    const { idUsuarios, nombre, idEstados } = req.body;

    // Aqui armamos la consulta para el procedimiento almacenado
    const sqlQuery = `
          EXEC sp_UpdateCategoriaProductos 
            @idCategoriaProductos = :idCategoriaProductos,
            @idUsuarios = :idUsuarios,
            @nombre = :nombre,
            @idEstados = :idEstados
        `;

    // aqui sustituimos los marcadores de posicion en la consulta sql
    await sequelize.query(sqlQuery, {
      replacements: {
        idCategoriaProductos: idCategoriaProductos,
        idUsuarios: idUsuarios,
        nombre: nombre,
        idEstados: idEstados,
      },
    });

    res.status(200).json({ message: 'Cateogira actualizada correctamente' }); 
  } catch (error) {
    res.status(500).json({ error: " error al actualizar la categoria" });
  }
}
