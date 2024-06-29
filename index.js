const express = require("express");
const dbConnection = require('./database/config');
const app = express(); 
require('dotenv').config();

// Middleware para manejar las solicitudes JSON
app.use(express.json()); 

// Middleware para las rutas de autenticación
app.use('/auth', require('./router/authRouter'));

// Conectar a la base de datos
dbConnection(); 

// Iniciar el servidor
const PORT = process.env.PORTLOCAL || 5000;
app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
});
