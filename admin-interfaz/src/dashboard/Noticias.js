import React, { useState, useEffect } from 'react';
import { getNoticias } from '../services/api';
import { Table } from 'react-bootstrap';
import CreateNoticia from './CreateNoticia';

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    async function fetchNoticias() {
      try {
        const noticiasData = await getNoticias();
        setNoticias(noticiasData);
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    }

    fetchNoticias();
  }, []);

  return (
    <div className="mt-4">
      <h1>Lista de Noticias</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Subtítulo</th>
            <th>Descripción</th>
            <th>URL Imagen</th>
          </tr>
        </thead>
        <tbody>
          {noticias.map((noticia) => (
            <tr key={noticia.id}>
              <td>{noticia.id}</td>
              <td>{noticia.titulo}</td>
              <td>{noticia.subtitulo}</td>
              <td>{noticia.contenido}</td>
              <td>{noticia.url_imagen}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateNoticia />
    </div>
  );
};

export default Noticias;
