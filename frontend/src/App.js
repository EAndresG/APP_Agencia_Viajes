import React, { useEffect, useState } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/') // Asegúrate de que el backend esté en este puerto
      .then(response => response.text())
      .then(data => {
        console.log('Respuesta del backend:', data);
        setMensaje(data);
      })
      .catch(error => console.error('Error al conectar con el backend:', error));
  }, []);

  return (
    <div>
      <h1>Conectando React con Express</h1>
      <p>{mensaje}</p> {/* Muestra el mensaje del backend */}
    </div>
  );
}

export default App;
