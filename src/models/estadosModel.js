import { DataTypes } from "sequelize";
import sequelize from '../config/db.js'



const Estado = sequelize.define('Estados',{
    idEstados:{
        type:DataTypes.INTEGER,
        primaryKey: true ,  
        autoIncrement: true     
    },
    nombre:{
        type: DataTypes.STRING,
        AllowNull: false
    }, 
    
    
})

export default Estado