const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());  // Habilitar CORS

app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Express!');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
