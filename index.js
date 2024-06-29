const express = require("express");

const app = express(); 
require('dotenv').config();

 
app.get('/saludo', (req,res) => {
    res.send ('Hola saludos desde el backend');
});


app.post('/crearUsuario', (req, res) => {
    res.send('Usuario creado'); 
});

app.delete('/borrarElemento', (req, res) => {
    res.send('Usuario eliminado');
});

app.put('/editar', (req, res) => {
    res.send('Usuario editado');
});

app.listen(process.env.PORT, () => {
    console.log(`El servidor se está ejecutando en el puerto ${process.env.PORT}`);
});

