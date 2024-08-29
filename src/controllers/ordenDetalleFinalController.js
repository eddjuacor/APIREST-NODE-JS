import sequelize from '../config/db.js'


//funcion para ejecutar el procedimiento almacenado para insertar insertarEstado
 export async function insertarOrdenDetalleFinal(req, res) {
  try {

    // Nombre del procedimiento almacenado
    const sp_InsertarDetalleOrden = 'sp_InsertarDetalleOrden'; 

    // Obtener los valores de los encabezados
    const idOrden = req.headers['idorden'];
    const idProductos = req.headers['idproductos'];

    // Obtener la lista de detalles de la orden desde el cuerpo de la solicitud
    const ordenDetalles = req.body.OrdenDetalleFinal;

    // Iterar sobre los detalles de la orden
    for (const detalle of ordenDetalles) {
      const {
        cantidad,
        precio,
        subtotal
      } = detalle;

       // aqui sustituimos los marcadores de posicion en la consulta sql
      const parametros = {
        replacements: {
          idOrden,
          idProductos,
          cantidad, 
          precio,
          subtotal
          
        },
        type: sequelize.QueryTypes.SELECT
      };

      // Ejecutar el procedimiento almacenado
      await sequelize.query(
        `EXEC ${sp_InsertarDetalleOrden} :idOrden, :idProductos, :cantidad, :precio, :subtotal`,
        parametros
      );
    }

    res.status(200).json({ message: 'Detalles de la orden final insertados correctamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}



export async function actualizarOrdenDetalleFinal(req, res){

  try {

    // Nombre del procedimiento almacenado
    const sp_UpdateDetalleOrden = 'sp_UpdateDetalleOrden'; 

    // Obtener los valores de los encabezados
    const idOrden = req.headers['idorden'];
    const idProductos = req.headers['idproductos'];
    const idOrdenDetalles =  req.headers['idordendetalles']

    // Obtener la lista de detalles de la orden desde la solicitud del clnte
    const ordenDetalles = req.body.OrdenDetalleFinal;

    // Iterar sobre los detalles de la orden 
    for (const detalle of ordenDetalles) {
      const {
        cantidad,
        precio,
        subtotal
      } = detalle;

      // aqui sustituimos los marcadores de posicion en la consulta sql
      const parametros = {
        replacements: {
            idOrdenDetalles,
            idOrden,
            idProductos,
            cantidad, 
            precio,
            subtotal
        },
        type: sequelize.QueryTypes.SELECT
      };

      // Ejecutar el procedimiento almacenado
      await sequelize.query(
        `EXEC ${sp_UpdateDetalleOrden} :idOrdenDetalles, :idOrden, :idProductos, :cantidad, :precio, :subtotal`,
        parametros
      );
    }

    res.status(200).json({ message: 'Detalles de la orden actualizados correctamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}




