// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import connection from './database.js';

import adminroutes from './routes/admin_routes.js';

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.PORT || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())


//conexion con la base de datos
connection()

// Rutas 
app.use('/eclof', adminroutes)

// Exportar la instancia de express por medio de app
app.get('/', (req,res) =>{
    res.send("Servidor Activo")
})


export default  app