import sequelize from '../config/db.js'

 export async function insertarCategoriaProductos(req, res) {
    try {
        const sp_InsertarCategoriaProductos = 'sp_InsertarCategoriaProductos'; // Nombre del procedimiento almacenado
        
        const parametros = {
          replacements: {
            idUsuarios: 1,
            nombre: "Electricidad",
            idEstado: 1
          },
          type: sequelize.QueryTypes.SELECT,
        };
    
        const resultado = await sequelize.query(`EXEC ${sp_InsertarCategoriaProductos} :idUsuarios, :nombre, :idEstado`, parametros);
    
        res.json(resultado); // el resultado se envia en json
      } catch (error) {
        console.error('Error ejecutando el procedimiento almacenado:', error);
        res.status(500).json({ error: 'Ocurrió un error al ejecutar el procedimiento almacenado' });
      }
  }
  
  //procedimiento almacenado para actualizar
  export async function actualizarCategoriaProductos(req, res) {
    try {
        const idCategoriaProductos = req.params.id;
        const { idUsuarios, nombre, idEstados } = req.body;
    
        // Aqui armamos la consulta para el procedimiento almacenado
        const sqlQuery = `
          EXEC sp_UpdateCategoriaProductos 
            @idCategoriaProductos = :idCategoriaProductos,
            @idUsuarios = :idUsuarios,
            @nombre = :nombre,
            @idEstados = :idEstados
        `;
    
        // Aqui ejecturo el procedimiento almacenado
        await sequelize.query(sqlQuery, {
          replacements: {
            idCategoriaProductos: idCategoriaProductos,
            idUsuarios: idUsuarios,
            nombre: nombre,
            idEstados: idEstados
          }
        });
    
        res.json({ mensaje: 'Categoria actualizada correctamente' });
      } catch (error) {
        console.error('Error actualizando la categoria:', error);
        res.status(500).json({ error: ' error al actualizar la categoria' });
      }
  }

  