const express = require('express');
const app = express();
const conectarDB = require('./config/db');

require('dotenv').config({path: './config/.env'});
const port = process.env.PORT_SERVER || 4500;

conectarDB();

app.use(express.json({ extend: true })); // sirve para poder interpretar formato JSON
app.use('/api/usuarios', require('./routes/usuarios')); // es la versión one liner de const usuario = require usuario y despu app.use('./usuario, usuario) por ej

app.listen(port, () => {
    console.log(`Server escuchando ${port}`)
});
