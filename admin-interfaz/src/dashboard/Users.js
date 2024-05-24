import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/api';
import { Table } from 'react-bootstrap';
const Users = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const usuariosData = await getUsers();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    }

    fetchUsuarios();
  }, []);

  return (
    <div className="mt-4">
      <div style={{ textAlign: 'center' }}>
        <h1>Lista de Usuarios</h1>
      </div>
      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
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
    </div>
  );
};

export default Users;
