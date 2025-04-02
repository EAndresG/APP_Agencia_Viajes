const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Express!');
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});

app.use(cors({ origin: 'http://localhost:3000' }));
