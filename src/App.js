import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import clienteAxios from './config/axios';

// Componentes
import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';
function App() {

  // State de la app
  const [ citas, guardarCitas] = useState([]);
  const [consultar, guardarConsultar] = useState(true);

  useEffect( () => {
    if(consultar){
      const consultarApi = () => {
        clienteAxios.get('/pacientes')
          .then(res => {
            // Colocar en el state el resultado
            guardarCitas(res.data);
            // Deshabilitar la consulta
            guardarConsultar(false);
          })
          .catch( err => console.log(err))
      }
  
      consultarApi();
    }
  }, {});


  return (
    <Router>
      <Switch>
        <Route path="/" element={ <Pacientes citas={citas} /> } />
        <Route path="/nueva" element={ <NuevaCita guardarConsultar={guardarConsultar}/> } />
        <Route path="/cita/:id" element={ <Cita/> } />
      </Switch>
    </Router>
  );
}

export default App;
