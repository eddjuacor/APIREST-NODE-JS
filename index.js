import express from 'express'
import db from './src/config/db.js'
import bodyParser from 'body-parser'
import productosRoutes from './src/routes/productosRoutes.js'
import categoriaProductosRoutes from './src/routes/categoriaProductosRoutes.js'
import estadoRoutes from './src/routes/estadosRoutes.js'
import usuariosRoutes from './src/routes/usuariosRoutes.js'
import ordenDetalleRoutes from './src/routes/ordenDetalleRoutes.js'
import authToken from './src/routes/authToken.js'

const app = express()
app.use(express.json()) 
app.use(express.urlencoded({extended: false}))


//conexion base de datos
try {
    await db.authenticate();
    console.log('conexion correcta');
} catch (error) {
    console.log(error)
}

app.use(bodyParser.json());

//alta a las rutas
app.use(productosRoutes)
app.use(categoriaProductosRoutes)
app.use(estadoRoutes)
app.use(usuariosRoutes)
app.use(ordenDetalleRoutes)
app.use(authToken)





//sevidor
const port = 3000;
app.listen(port, () => {
    console.log(`el servidor esta corriendo en el puerto: ${port}`)
})