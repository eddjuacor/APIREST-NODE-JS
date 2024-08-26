import sequelize from '../config/db.js'

 export async function insertarOrdenDetalles(req, res) {
  try {
    const InsertarOrden = 'InsertarOrden'; // Nombre del procedimiento almacenado

    const parametros = {
      replacements: {
        idUsuarios: 1,
        idEstados: 1,
        nombre_completo: "Jorge Asturas",
        direccion: "4ta. calle 2-34",
        telefono: "22334455",
        correo_electronico: "jorgeasaturias@gmail.com",
        fecha_entrega: "2024-09-12",
        total_orden: 200.22
      },
      type: sequelize.QueryTypes.SELECT,
    };

    const resultado = await sequelize.query(`EXEC ${InsertarOrden} :idUsuarios, :idEstados, :nombre_completo, :direccion, :telefono, :correo_electronico, :fecha_entrega, :total_orden `, parametros);

    //insertar ordenDetalle

    const sp_InsertarDetalleOrden = 'sp_InsertarDetalleOrden'; // Nombre del procedimiento almacenado

    const parametrosOrdenDetalle = {
      replacements: {
        idOrden: 55,
        idProductos: 3,
        cantidad: 3,
        precio: 300,
        subtotal: 900
      },
      type: sequelize.QueryTypes.SELECT,
    };

     await sequelize.query(`EXEC ${sp_InsertarDetalleOrden} :idOrden, :idProductos, :cantidad, :precio, :subtotal `, parametrosOrdenDetalle);



    res.json(resultado); // el resultado se envia en json
  } catch (error) {
    console.error('Error ejecutando el procedimiento almacenado:', error);
    res.status(500).json({ error: 'Ocurrió un error al ejecutar el procedimiento almacenado' });
  }

  }
  
  //procedimiento almacenado para actualizar


  export async function actualizarOrdenDetalles(req, res) {
    try {
      const idOrden = req.params.id;
      const { idUsuarios, idEstados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden } = req.body;
  
      // Aqui armamos la consulta para el procedimiento almacenado
      const sqlQuery = `
        EXEC [sp_UpdateOrden] 
          @idOrden: idOrden,
          @idUsuarios = :idUsuarios,
          @idEstados = :idEstados,
          @nombre_completo = :nombre_completo,
          @direccion = :direccion,
          @telefono = :telefono,
          @correo_electronico = :correo_electronico,
          @fecha_entrega = :fecha_entrega,
          @total_orden = :total_orden
      `;
  
      // Aqui ejecturo el procedimiento almacenado
      await sequelize.query(sqlQuery, {
        replacements: {
          idOrden:idOrden,
          idUsuarios: idUsuarios,
          idEstados: idEstados,
          nombre_completo: nombre_completo,
          direccion: direccion,
          telefono: telefono,
          correo_electronico: correo_electronico,
          fecha_entrega: fecha_entrega,
          total_orden: total_orden
        }
      });

      
      const idOrdenDetalle = req.params.id;

      const sqlQueryUpdateDetalleOrden = `
        EXEC [sp_UpdateDetalleOrden] 
          @idOrdenDetalle: idOrdenDetalle,
          @idOrden: idOrden,
          @idProductos : idProductos,
          @cantidad : cantidad,
          @precio : precio,
          @subtotal : subtotal
      `;
  
      // Aqui ejecturo el procedimiento almacenado
      await sequelize.query(sqlQueryUpdateDetalleOrden, {
        replacements: {
          idOrdenDetalle:idOrdenDetalle,
          idOrden: idOrden,
          idProductos: idProductos,
          cantidad: cantidad,
          precio: precio,
          subtotal: subtotal
          
        }
      });
  
      res.json({ mensaje: 'Producto actualizad0 correctamente' });
    } catch (error) {
      console.error('Error actualizando el producto:', error);
      res.status(500).json({ error: ' error al actualizar el produccto' });
    }
  
  }
