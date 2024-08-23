import express from 'express'
import db from './src/config/db.js'
import bodyParser from 'body-parser'
import productosRoutes from './src/routes/productosRoutes.js'
import categoriaProductosRoutes from './src/routes/categoriaProductosRoutes.js'
import estadoRoutes from './src/routes/estadosRoutes.js'
const app = express()

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


//sevidor
const port = 3000;
app.listen(port, () => {
    console.log(`el servidor esta corriendo en el puerto: ${port}`)
})