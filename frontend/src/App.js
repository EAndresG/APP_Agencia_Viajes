import React, { useEffect, useState } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/') // Asegúrate de que este es el endpoint correcto
      .then(response => response.text()) // Si el backend responde con texto
      .then(data => setMensaje(data)) // Guardar en el estado
      .catch(error => console.error('Error al conectar con el backend:', error));
  }, []);

  return (
    <div>
      <h1>Conectando React con Express</h1>
      <p>{mensaje}</p> {/* Aquí se muestra el mensaje del backend */}
    </div>
  );
}

export default App;
