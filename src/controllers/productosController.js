import sequelize from "../config/db.js";

export async function insertarProductos(req, res) {
  try {

    // Nombre del procedimiento almacenado
    const sp_InsertarProductos = "sp_InsertarProductos"; 

    const {
      idCategoriaProductos,
      idUsuarios,
      nombre,
      marca,
      codigo,
      stock,
      idEstados,
      precio,
    } = req.body;

    const parametros = {
      replacements: {
        idCategoriaProductos,
        idUsuarios,
        nombre,
        marca,
        codigo,
        stock,
        idEstados,
        precio,
      },
      type: sequelize.QueryTypes.SELECT,
    };

    await sequelize.query(
      `EXEC ${sp_InsertarProductos} :idCategoriaProductos, :idUsuarios, :nombre, :marca, :codigo, :stock, :idEstados, :precio `,
      parametros
    );

    res.status(200).json({ message: 'Producto ingresado correctamente' }); 
  } catch (error) {
    console.error("Error ejecutando el procedimiento almacenado:", error);
    res.status(500).json({
      error: "Ocurrió un error al ejecutar el procedimiento almacenado",
    });
  }
}

//procedimiento almacenado para actualizar

export async function actualizarProductos(req, res) {
  try {
    const idProductos = req.params.id;
    const {
      idUsuarios,
      idCategoriaProductos,
      nombre,
      marca,
      codigo,
      stock,
      idEstados,
      precio,
    } = req.body;

    // Aqui armamos la consulta para el procedimiento almacenado
    const sqlQuery = `
          EXEC [sp_UpdateProductos] 
            @idProductos = :idProductos,
            @idCategoriaProductos = :idCategoriaProductos,
            @idUsuarios = :idUsuarios,
            @nombre = :nombre,
            @marca = :marca,
            @codigo = :codigo,
            @stock = :stock,
            @idEstados = :idEstados,
            @precio = :precio

        `;

    // Aqui ejecturo el procedimiento almacenado
    await sequelize.query(sqlQuery, {
      replacements: {
        idProductos: idProductos,
        idCategoriaProductos: idCategoriaProductos,
        idUsuarios: idUsuarios,
        nombre: nombre,
        marca: marca,
        codigo: codigo,
        stock: stock,
        idEstados: idEstados,
        precio: precio,
      },
    });

    res.status(200).json({ message: 'Estado actualizado correctamente' }); 
  } catch (error) {
    console.error("Error actualizando el producto:", error);
    res.status(500).json({ error: " error al actualizar el produccto" });
  }
}
