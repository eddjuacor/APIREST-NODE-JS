import sequelize from '../config/db.js';


// get orden detalle
export const listarOrdenes = async (req, res) => {
  try {
    const { idOrden } = req.params;

    const resultado = await sequelize.query(
      `SELECT 
    o.idUsuarios,
    o.idEstados,
    o.fecha_creacion,
    o.nombre_completo,
    o.direccion,
    o.telefono,
    o.correo_electronico,
    o.fecha_entrega,
    o.total_orden,
    (
        SELECT 
            od.idProductos, 
            od.cantidad, 
            od.precio, 
            od.subtotal
                
        FROM 
            OrdenDetalles od
        WHERE 
            od.idOrden = o.idOrden
        FOR JSON PATH
    ) AS detalles
FROM 
    Orden o
WHERE 
    o.idOrden = idOrden;`,
      {
          replacements: { idOrden },
          type: sequelize.QueryTypes.SELECT
      }
  );

  console.log('Resultado:', resultado); 

  if (resultado.length === 0) {
    return res.status(404).json({ message: 'Orden no encontrada' });
  }

  // Asumiendo que resultado es un array, y el primer elemento es el que necesitamos
  const orden = resultado[0];

   // La columna 'detalles' puede contener una cadena JSON que necesitamos analizar
   if (orden.detalles) {
    orden.detalles = JSON.parse(orden.detalles);
  }

  res.status(200).json(orden);
  } catch (error) {
    console.error('Error al obtener la orden:', error.message);
    res.status(500).json({ message: 'Error al obtener la orden con detalles', error: error.message });
  }
};



//insertar Orden detalles

export const crearOrden = async (req, res) => {
  const { idUsuarios, idEstados, fecha_creacion, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden, detalles } = req.body;

  const transaction = await sequelize.transaction(); // Inicia una transacción

  try {


    // Ejecuta el procedimiento almacenado para insertar la orden
    const [orderResult] = await sequelize.query(
      `DECLARE @idOrden INT;
         EXEC InsertarOrden 
           @idUsuarios = :idUsuarios,
           @idEstados = :idEstados,
           @nombre_completo = :nombre_completo,
           @direccion = :direccion,
           @telefono = :telefono,
           @correo_electronico = :correo_electronico,
           @fecha_entrega = :fecha_entrega,
           @total_orden = :total_orden,
           @idOrden = @idOrden OUTPUT;
         SELECT @idOrden AS idOrden;`,
      {
        replacements: {
          idUsuarios,
          idEstados,
          fecha_creacion, // Usa la fecha en el formato YYYY-MM-DD
          nombre_completo,
          direccion,
          telefono,
          correo_electronico,
          fecha_entrega,
          total_orden
        },
        type: sequelize.QueryTypes.SELECT,
        transaction,
      }
    );


    const idOrden = orderResult.idOrden; // Captura el ID de la orden recién creada
    console.log(idOrden)

    
 // Ejecuta el procedimiento almacenado para insertar los detalles de la orden
 for (const detalle of detalles) {
  if (typeof detalle !== 'object' || !detalle.idProductos || !detalle.cantidad || !detalle.precio || !detalle.subtotal) {
    throw new Error('Detalle de la orden no es válido.');
  }
      await sequelize.query(
        `EXEC [sp_InsertarDetalleOrden] 
            @idOrden = :idOrden,
            @idProductos = :idProductos,
            @cantidad = :cantidad,
            @precio = :precio,
            @subtotal = :subtotal
            `,

        {
          replacements: { idOrden, ...detalle },
          type: sequelize.QueryTypes.INSERT,
          transaction,
        }
      );
    }

    await transaction.commit(); // Confirma la transacción

    return res.status(201).json({ message: 'Orden creada con éxito', orderId: idOrden });
  } catch (error) {
    await transaction.rollback(); // Revertir en caso de error
    console.error('Error al crear la orden:', error);
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};



//actualizar encabezado de la orden detalle

export const ordenUpdate = async (req, res) => {

  try {
    const idOrden = req.params.id;
    const {
      idUsuarios,
      idEstados,
      fecha_creacion,
      nombre_completo,
      direccion,
      telefono,
      correo_electronico,
      fecha_entrega,
      total_orden
    } = req.body;

    // Aqui armamos la consulta para el procedimiento almacenado
    const sqlQuery = `
        EXEC sp_UpdateOrden 
           @idOrden = :idOrden,
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
        idOrden: idOrden,
        idUsuarios: idUsuarios,
        fecha_creacion: fecha_creacion,
        idEstados: idEstados,
        nombre_completo: nombre_completo,
        direccion: direccion,
        telefono: telefono,
        correo_electronico: correo_electronico,
        fecha_entrega: fecha_entrega,
        total_orden: total_orden
      },
    });

    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error("Error actualizando el producto:", error);
    res.status(500).json({ error: " error al actualizar el produccto" });
  }
};