import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/api'; // Suponiendo que tienes una función getUsers en tu archivo de servicios para obtener los usuarios
import { Table } from 'react-bootstrap';

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const usuariosData = await getUsers(); // Obtener la lista de usuarios
        setUsuarios(usuariosData); // Actualizar el estado con los usuarios obtenidos
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    }

    fetchUsuarios();
  }, []);

  return (
    <div className="mt-4">
      <h1>Lista de Usuarios</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.apaterno}</td>
              <td>{usuario.amaterno}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
