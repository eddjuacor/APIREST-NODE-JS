import express from 'express'
import db from './src/config/db.js'
import bodyParser from 'body-parser'
import usuariosRoutes from './src/routes/usuariosRoutes.js'
import productosRoutes from './src/routes/productosRoutes.js'
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
app.use(usuariosRoutes)
app.use(productosRoutes)


//sevidor
const port = 3000;
app.listen(port, () => {
    console.log(`el servidor esta corriendo en el puerto: ${port}`)
})