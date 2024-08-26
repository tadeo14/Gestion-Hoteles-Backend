const express = require('express');
const dbConnection = require('./database/config');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express(); 

// Middleware para manejar las solicitudes JSON
app.use(express.json()); 

// Middleware para manejar CORS
app.use(cors({
    origin: '*', // Permitir solicitudes desde tu frontend
}));

// Configura la carpeta pública para servir archivos estáticos
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Middleware para las rutas de autenticación
app.use('/auth', require('./router/authRouter'));

// Asegúrate de que estos archivos existen y están correctamente definidos
app.use('/admin', require('./router/adminRouter'));
app.use('/room', require('./router/roomRouter '));

// Conectar a la base de datos
dbConnection(); 

// Iniciar el servidor
const PORT = process.env.PORTLOCAL || 5000;
app.listen(PORT, () => {
    console.log(`Ejecutandose en el puerto ${PORT}`);
});
