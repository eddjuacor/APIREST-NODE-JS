import sequelize from '../config/db.js'

 export async function insertarProductos(req, res) {
    try {
        const sp_InsertarProductos = 'sp_InsertarProductos'; // Nombre del procedimiento almacenado
        
        const parametros = {
          replacements: {
            "idCategoriaProductos": 1,
            "idUsuarios": 1,
            "nombre": "Drone Mavic Air 10",
            "marca":"DJI",
            "codgo": "MAVICAIR10",
            "stock": 330,
            "idEstados": 1,
            "precio": 4566
          },
          type: sequelize.QueryTypes.SELECT,
        };
    
        const resultado = await sequelize.query(`EXEC ${sp_InsertarProductos} :idCategoriaProductos, :idUsuarios, :nombre, :marca, :codgo, :stock, :idEstados, :precio `, parametros);
    
        res.json(resultado); // el resultado se envia en json
      } catch (error) {
        console.error('Error ejecutando el procedimiento almacenado:', error);
        res.status(500).json({ error: 'Ocurrió un error al ejecutar el procedimiento almacenado' });
      }
  }
  
  //procedimiento almacenado para actualizar
  export async function actualizarProductos(req, res) {
    try {
        const idProductos = req.params.id;
        const { idUsuarios, idCategoriaProductos, nombre, marca, codigo, stock, idEstados, precio } = req.body;
    
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
            precio: precio
          }
        });
    
        res.json({ mensaje: 'Producto actualizad0 correctamente' });
      } catch (error) {
        console.error('Error actualizando el producto:', error);
        res.status(500).json({ error: ' error al actualizar el produccto' });
      }
  }
