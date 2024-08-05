const express = require('express');
const dbConnection = require('./database/config');
const cors = require('cors');
const app = express(); 
const path = require('path')
require('dotenv').config();

// Middleware para manejar las solicitudes JSON
app.use(express.json()); 

// Middleware para manejar CORS
app.use(cors({
	origin: 'http://localhost:5173', // Permitir solicitudes desde tu frontend
  }));

// Configura la carpeta pública para servir archivos estáticos
app.use('/images', express.static(path.join(__dirname, 'public/images')));

  

// Middleware para las rutas de autenticación
app.use('/auth', require('./router/authRouter'));
app.use('/admin', require('./router/adminRouter'));
app.use('/room', require('./router/roomRouter ')); //***** */


// Conectar a la base de datos
dbConnection(); 

// Iniciar el servidor
app.listen(process.env.PORTLOCAL, () => {
	console.log(`Ejecutandose en el puerto ${process.env.PORTLOCAL}`);
});
