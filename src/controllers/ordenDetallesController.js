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
    const sp_UpdateDetalleOrden = 'sp_UpdateDetalleOrden'; // Nombre del procedimiento almacenado
    
    const  idOrden  = req.headers['idorden'];

    const idUsuarios = req.headers['idusuarios'];
    const idEstados = req.headers['idestados'];

   await sequelize.query(
  `EXEC ${sp_UpdateDetalleOrden} :idOrden, :idUsuarios, :idEstados`,
  {
      replacements: {
          idOrden:idOrden,
          idUsuarios:idUsuarios,
          idEstados:idEstados,
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


