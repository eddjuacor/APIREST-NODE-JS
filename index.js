import express from 'express'
import db from './src/config/db.js'
import bodyParser from 'body-parser'
import productosRoutes from './src/routes/productosRoutes.js'
import categoriaProductosRoutes from './src/routes/categoriaProductosRoutes.js'
import estadoRoutes from './src/routes/estadosRoutes.js'
import usuariosRoutes from './src/routes/usuariosRoutes.js'
import ordenDetalleRoutes from './src/routes/ordenDetalleRoutes.js'
import authTokenRoutes from './src/routes/authTokenRoutes.js'
import ordenDetalleFinal from './src/routes/ordenDetalleFinal.js'

//inicializamos express
const app = express()

//configuaamos el middleware para analizar las solicitudes http
app.use(express.json()) 

// para analizar el cuerpo de las solicitudes http
app.use(bodyParser.json());

//conexion base de datos
try {
    await db.authenticate();
    console.log('conexion correcta');
} catch (error) {
    console.log(error)
}


//alta a las rutas
app.use(productosRoutes)
app.use(categoriaProductosRoutes)
app.use(estadoRoutes)
app.use(usuariosRoutes)
app.use(ordenDetalleRoutes)
app.use(authTokenRoutes)
app.use(ordenDetalleFinal)




//sevidor
const port = 3000;
app.listen(port, () => {
    console.log(`el servidor esta corriendo en el puerto: ${port}`)
})