const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.STRING_SERVER_MONGO, {});
        console.log('Conectado a MongoDB');
    }
    catch (err) {
        console.error(err);
        process.exit(1); //detiene la app
    }
}

module.exports = conectarDB;