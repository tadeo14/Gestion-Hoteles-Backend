const express = require("express");

const app = express(); 
require('dotenv').config();
app.use('/auth', require('./router/authRouter'));
 


app.listen(process.env.PORTLOCAL, () => {
    console.log(`El servidor se está ejecutando en el puerto ${process.env.PORTLOCAL}`);
});

