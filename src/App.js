import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Artista from './components/Artista';



function App() {

  /* State */
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra,guardarLetra] = useState('');
  const [artista, guardarArtista] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarAPILetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url_letra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url_info = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      
      /* La idea del promise es que se ejecuten al mismo tiempo, independiente de cuanto se demore cada una. Y posterior a eso, retornar el resultado de la consulta */
      const [letra, informacion] = await Promise.all([
        axios(url_letra), axios(url_info)
      ]);

      guardarLetra(letra.data.lyrics);
      guardarArtista(informacion.data.artists[0]);
    };

    consultarAPILetra();    
  }, [busquedaletra])

  return (
    <Fragment>
      <Formulario
        guardarBusquedaLetra={guardarBusquedaLetra}
      />

      <div className="container mt-5">
        <div className="row">
          
          <div className="col-md-6">
            <Artista
              artista={artista}
            />
          </div>

          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
