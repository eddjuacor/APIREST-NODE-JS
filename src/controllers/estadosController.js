import Estado from '../models/estadosModel.js'

export async function getEstados(req, res) {
    try {
        const esatdos = await Estado.findAll();
        res.json(esatdos);
      } catch (error) {
        console.error('Error al obtener estados:', error);
      }
  }


export async function insertarEstado( req, res) {
    const {idEstados, nombre} = req.body
    try {
        // Crear un nuevo registro en la base de datos
        const nuevoEstado = await Estado.create({ idEstados, nombre });
        res.status(201).json(nuevoEstado);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

export async function actualizarEstado(req, res){
  const idEstados = parseInt(req.params.id, 10);
  const {nombre } = req.body;

  try {
    // Actualizar el registro en la base de datos
    const [affectedRows] = await Estado.update(
      { nombre },
      { where: { idEstados: idEstados } }
    );

    if (affectedRows > 0) {
      // Obtener el usuario actualizado
      const updatedEstados = await Estado.findByPk(idEstados);
      res.json(updatedEstados);
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
