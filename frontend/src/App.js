import React, { useEffect, useState } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:6000/')  // Asegúrate de que Express está en el puerto 5000
      .then(response => response.text())
      .then(data => {
        console.log('Respuesta del backend:', data);
        setMensaje(data); // Guardar la respuesta en el estado
      })
      .catch(error => console.error('Error al conectar con el backend:', error));
  }, []);

  return (
    <div>
      <h1>Conectando React con Express</h1>
      <p>{mensaje}</p> {/* Ahora sí muestra el mensaje del backend */}
    </div>
  );
}

export default App;
