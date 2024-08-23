import { DataTypes } from "sequelize";
import sequelize from '../config/db.js'



const Producto = sequelize.define('Productos',{
    idProductos:{
        type:DataTypes.INTEGER,
        primaryKey: true ,  
        autoIncrement: true     
    },
    idCategoriaProductos:{
        type:DataTypes.INTEGER,  
        AllowNull: false   
    },
    idUsuarios:{
        type:DataTypes.INTEGER,  
        AllowNull: false   
    },
    nombre:{
        type: DataTypes.STRING,
        AllowNull: false
    }, 
    marca:{
        type: DataTypes.STRING,
        AllowNull: false
    }, 
    codigo:{
        type: DataTypes.STRING,
        AllowNull: false
    }, 
    stock:{
        type: DataTypes.FLOAT,
        AllowNull: false
    }, 
    idEstados:{
        type: DataTypes.INTEGER,
        AllowNull: false
    }, 
    precio:{
        type: DataTypes.FLOAT,
        AllowNull: false
    }, 
    fecha_creacion:{
        type: DataTypes.DATEONLY,
        AllowNull: false,
        defaultValue: new Date()
    }, 
    
})

export default Producto