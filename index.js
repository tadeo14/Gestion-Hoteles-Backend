const express = require('express');
const dbConnection = require('./database/config');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*',
}));

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/auth', require('./router/authRouter'));
app.use('/admin', require('./router/adminRouter'));
app.use('/room', require('./router/roomRouter'));

dbConnection();

const PORT = process.env.PORTLOCAL || 5000;
app.listen(PORT, () => {
    console.log(`Ejecutandose en el puerto ${PORT}`);
});
