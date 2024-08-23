import Producto from '../models/productosModel.js'

export async function getProductos(req, res) {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
      } catch (error) {
        console.error('Error al obtener estados:', error);
      }
  }


export async function insertarProductos( req, res) {
    const {
        idProductos, idCategoriaProductos,idUsuarios, nombre, 
        marca, codigo, stock, idEstados, precio, fecha_creacion
        } = req.body
    try {
        // Crear un nuevo registro en la base de datos
        const nuevoProducto = await Producto.create({
             idProductos, idCategoriaProductos,idUsuarios, nombre, 
             marca, codigo, stock, idEstados, precio, fecha_creacion   
            });
        res.status(201).json(nuevoProducto);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

export async function actualizarProductos(req, res){
  const idProductos = parseInt(req.params.id, 10);
  const {
    idCategoriaProductos,idUsuarios, nombre, 
    marca, codigo, stock, idEstados, precio, fecha_creacion
   } = req.body;

  try {
    // Actualizar el registro en la base de datos
    const [affectedRows] = await Producto.update(
      { 
        idCategoriaProductos,idUsuarios, nombre, 
         marca, codigo, stock, idEstados, precio, fecha_creacion
      },
      { where: { idProductos: idProductos } }
    );

    if (affectedRows > 0) {
      // Obtener el usuario actualizado
      const updatedProductos = await Producto.findByPk(idProductos);
      res.json(updatedProductos);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
