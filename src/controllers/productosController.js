import sequelize from "../config/db.js";

import fs from 'fs';
import path from 'path';  

// Función para guardar la imagen y devolver la URL
export async function guardarImagen(file) {
  try {
    if (!file) {
      throw new Error('No se ha proporcionado un archivo.');
    }

    const imagePath = `/uploads/${file.originalname}`;
    const newPath = path.join(process.cwd(), 'uploads', file.originalname);

    // Mover archivo a la carpeta de uploads
    fs.renameSync(file.path, newPath);

    // Insertar la URL de la imagen en la base de datos
    const sql = `
      INSERT INTO Productos (foto) 
      VALUES (:foto)
    `;

    const parametros = {
      replacements: { foto: imagePath },
      type: sequelize.QueryTypes.INSERT,
    };

    await sequelize.query(sql, parametros);

    return imagePath;
  } catch (error) {
    console.error('Error guardando la imagen en la base de datos:', error);
    throw error; // Propagar el error para manejarlo en la ruta
  }
}

///////////////////////////////////////////////

export const listarProductos = async (req, res) => {
  try {
      const productos = await sequelize.query(
          `SELECT * FROM Productos`, // Consulta SQL directa
          {
              type: sequelize.QueryTypes.SELECT // Especifica el tipo de consulta
          }
      );

      res.status(200).json(productos); // Devuelve las categorías en formato JSON
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};



export async function insertarProductos(req, res) {
  try {
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

     // Obtén el nombre del archivo
     const foto = req.file ? req.file.filename : '';


    // Nombre del procedimiento almacenado
    const sp_InsertarProductos = "sp_InsertarProductos";

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
        foto, // Pasar la ruta de la foto al procedimiento almacenado
      },
      type: sequelize.QueryTypes.SELECT,
    };

    await sequelize.query(
      `EXEC ${sp_InsertarProductos} :idCategoriaProductos, :idUsuarios, :nombre, :marca, :codigo, :stock, :idEstados, :precio, :foto`,
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

    res.status(200).json({ message: 'Producto actualizado correctamente' }); 
  } catch (error) {
    console.error("Error actualizando el producto:", error);
    res.status(500).json({ error: " error al actualizar el produccto" });
  }
}
