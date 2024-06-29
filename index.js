const express = require("express");

const app = express(); 

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

app.listen(4000, () => {
    console.log('El servidor se está ejecutando en el puerto 4000');
});
