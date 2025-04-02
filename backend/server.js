const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());  // Habilita CORS para permitir solicitudes desde React

app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Express!');
});

app.listen(5000, () => {
    console.log('Servidor corriendo en http://localhost:5000');
});
