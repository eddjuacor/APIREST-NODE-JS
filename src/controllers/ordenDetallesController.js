import sequelize from '../config/db.js'

 export async function insertarOrdenDetalles(req, res) {
  try {

    // Nombre del procedimiento almacenado
    const InsertarOrden = 'InsertarOrden'; 

    // Obtener los valores de los encabezados
    const idUsuarios = req.headers['idusuarios'];
    const idEstados = req.headers['idestados'];

 // Obtener la lista de detalles de la orden desde el cuerpo de la solicitud
    const ordenDetalles = req.body.OrdenDetalle;

    // Iterar sobre los detalles de la orden 
    for (const detalle of ordenDetalles) {
      const {
        nombre_completo,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        total_orden
      } = detalle;

      // aqui sustituimos los marcadores de posicion en la consulta sql
      const parametros = {
        replacements: {
          idUsuarios,
          idEstados,
          nombre_completo,
          direccion,
          telefono,
          correo_electronico,
          fecha_entrega,
          total_orden,
          
        },
        type: sequelize.QueryTypes.SELECT
      };

      // Ejecutar el procedimiento almacenado
      await sequelize.query(
        `EXEC ${InsertarOrden} :idUsuarios, :idEstados, :nombre_completo, :direccion, :telefono, :correo_electronico, :fecha_entrega, :total_orden`,
        parametros
      );
    }

    res.status(200).json({ message: 'Detalles de la orden insertados correctamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}



export async function actualizarOrdenDetalle(req, res){

  try {

    // Nombre del procedimiento almacenado
    const sp_UpdateOrden = 'sp_UpdateOrden'; 

    // Obtener los valores de los encabezados
    const idUsuarios = req.headers['idusuarios'];
    const idEstados = req.headers['idestados'];
    const idOrden =  req.headers['idorden']

    // Obtener la lista de detalles de la orden desde el cuerpo de la solicitud
    const ordenDetalles = req.body.OrdenDetalle;

    // Validar que ordenDetalles sea un array
    if (!Array.isArray(ordenDetalles)) {
      return res.status(400).json({ error: 'OrdenDetalle debe ser un array' });
    }

    // Iterar sobre los detalles de la orden y ejecutar el procedimiento almacenado para cada uno
    for (const detalle of ordenDetalles) {
      const {
        nombre_completo,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        total_orden
      } = detalle;

      // Validar que los campos requeridos estén presentes
      if (!nombre_completo || !direccion || !telefono) {
        return res.status(400).json({ error: 'Faltan campos requeridos en el detalle de la orden' });
      }

      
      // aqui sustituimos los marcadores de posicion en la consulta sql
      const parametros = {
        replacements: {
          idOrden,
          idUsuarios,
          idEstados,
          nombre_completo,
          direccion,
          telefono,
          correo_electronico,
          fecha_entrega,
          total_orden,
          
        },
        type: sequelize.QueryTypes.SELECT
      };

      // Ejecutar el procedimiento almacenado
      await sequelize.query(
        `EXEC ${sp_UpdateOrden} :idOrden, :idUsuarios, :idEstados, :nombre_completo, :direccion, :telefono, :correo_electronico, :fecha_entrega, :total_orden`,
        parametros
      );
    }

    res.status(200).json({ message: 'Detalles de la orden insertados correctamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}




