import sequelize from '../config/db.js'

 export async function insertarOrdenDetalles(req, res) {
  try {
    const InsertarOrden = 'InsertarOrden'; // Nombre del procedimiento almacenado

    const idUsuarios = req.headers['idusuarios'];
    const idEstados = req.headers['idestados'];

    const ordenDetalle =  req.body.OrdenDetalle;
    
    for (const orden of ordenDetalle) {
      const {
          nombre_completo,
          direccion,
          telefono,
          correo_electronico,
          fecha_entrega,
          total_orden
      } = orden;
  
    const parametros ={
          replacements: {
              idUsuarios,
              idEstados,
              nombre_completo,
              direccion,
              telefono,
              correo_electronico,
              fecha_entrega,
              total_orden
          },
          type: sequelize.QueryTypes.SELECT
      }

  await sequelize.query( `EXEC ${InsertarOrden} :idUsuarios, :idEstados, :nombre_completo, :direccion, :telefono, :correo_electronico, :fecha_entrega, :total_orden`, parametros)
}
  res.status(200).json({ message: 'Order created successfully' });
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
}

//Actulaizar orden solo headers

export async function actualizarOrdenDetalle(){

  try{ 
    const UpdateDetalleOrden = 'UpdateDetalleOrden'; // Nombre del procedimiento almacenado
    
  const  idOrden  = req.headers['idOrden'].id;

    const idUsuarios = req.headers['idusuarios'];
    const idEstados = req.headers['idestados'];

    if (!idOrden) {
      console.error('Missing order ID');
      return res.status(400).json({ error: 'Missing order ID' });
  }

  if (!idUsuarios || !idEstados) {
    console.error('Missing required fields in headers');
    return res.status(400).json({ error: 'Missing required fields in headers' });
}

await sequelize.query(
  `EXEC ${UpdateDetalleOrden} :idOrden, :idUsuarios, :idEstados`,
  {
      replacements: {
          idOrden: parseInt(idOrden, 10),
          idUsuarios: parseInt(idUsuarios, 10),
          idEstados: parseInt(idEstados, 10)
      },
      type: sequelize.QueryTypes.SELECT
  }
);

res.status(200).json({ message: 'Order updated successfully' });
} catch (error) {
console.error('Error:', error);
res.status(500).json({ error: 'Internal Server Error' });
}

}


