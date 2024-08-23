import sequelize from '../config/db.js'

 export async function insertarEstado(req, res) {
    try {
        const sp_Estados = 'sp_Estados'; // Nombre del procedimiento almacenado
        
        const {nombre} = req.body;

        const parametros = {
          replacements: {
            nombre
          },
          type: sequelize.QueryTypes.SELECT,
        };
    
        const resultado = await sequelize.query(`EXEC ${sp_Estados} :nombre`, parametros);
    
        res.json(resultado); // el resultado se envia en json
      } catch (error) {
        console.error('Error ejecutando el procedimiento almacenado:', error);
        res.status(500).json({ error: 'Ocurrió un error al ejecutar el procedimiento almacenado' });
      }
  }
  
  //procedimiento almacenado para actualizar
  export async function actualizarEstado(req, res) {
    try {
        const idEstados = req.params.id;
        const { nombre } = req.body;
    
        // Aqui armamos la consulta para el procedimiento almacenado
        const sqlQuery = `
          EXEC [sp_UpdateEstados] 
            @idEstados = :idEstados,
            @nombre = :nombre
            

        `;
    
        // Aqui ejecturo el procedimiento almacenado
        await sequelize.query(sqlQuery, {
          replacements: {
            idEstados: idEstados,
            nombre: nombre,
          }
        });
    
        res.json({ mensaje: 'Estado actualizad0 correctamente' });
      } catch (error) {
        console.error('Error actualizando el estado:', error);
        res.status(500).json({ error: ' error al actualizar el produccto' });
      }
  }
