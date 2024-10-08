import Sequelize from 'sequelize'
import dotenv from 'dotenv'

//variables de entorno, lo utilizo, env para no dejar a primera vista los datos de conexion
dotenv.config({path:'.env'})

//aque se coloca la conexion a la base de datos
const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS,{
    host: process.env.BD_HOST,
    port: '1433',
    dialect:'mssql',
    define:{
        timestamps: false
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


export default db;