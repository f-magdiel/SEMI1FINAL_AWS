import React, { useEffect,useState } from 'react';
import axios from 'axios';
import CardFoto from './CardFoto';
import './Style.css';

function VerFotoPage() {

    const url1 = " http://127.0.0.1:5000/rds/fotosPerfil";
    const url2 = " http://127.0.0.1:5000/rds/fotosPublicaciones";
    const [perfil, setFotoPerfil] = useState({});
    const [publicadas, setFotoPublicadas] = useState({});
  

    useEffect(() => {
        axios.all([axios.get(url1), axios.get(url2)])
        .then(axios.spread((response1, response2) => {
            //console.log(response1.data.fotosPerfil.map((foto) => foto.urlPerfil));
            setFotoPerfil(response1.data);
            setFotoPublicadas(response2.data);
            console.log(response2.data);
        }));

    }, []);
  
   
    return (
        <div>
          <h1>Foto Perfil</h1>
          <div className="perfil-container">
            {perfil.fotosPerfil && perfil.fotosPerfil.map((foto) => <CardFoto foto={foto.urlPerfil} />)}
          </div>
          <h1>Foto Publicadas</h1>
          <div className="publicaciones-container">
            {publicadas.fotosPublicaciones && publicadas.fotosPublicaciones.map((publicacion) => {
              return (
                <div className="publicacion">
                  <h3>Album: {publicacion.album}</h3>
                  <ul>
                    {publicacion.fotos.map((foto) => {
                      if (foto === "Vacio") {
                        return <li>Vacio</li>
                      } else {
                        return <li><CardFoto foto={foto.urlPost} /></li>
                      }
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      );
    }

export default VerFotoPage;