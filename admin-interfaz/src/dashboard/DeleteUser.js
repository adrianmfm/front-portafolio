import React, { useState, useEffect } from 'react';
import { getUsers, deleteUserById } from '../services/api';
import { Dropdown, Modal, Button, Card } from 'react-bootstrap';

const DeleteUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        console.log('Lista de usuarios:', userList);
        if (userList && userList.length > 0) {
          setUsers(userList);
        }
      } catch (error) {
        console.error('Error obteniendo usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true); // Mostrar el modal al seleccionar un usuario
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserById(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setSelectedUser(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCloseDeleteModal = () => {
    setSelectedUser(null);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
        Eliminar Usuario
      </Button>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {selectedUser ? selectedUser.nombre : 'Seleccionar Usuario'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {users.map((user) => (
                <Dropdown.Item key={user.id} onClick={() => handleUserSelect(user)}>
                  {user.nombre}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {selectedUser && (
            <Button variant="danger" size="sm" onClick={() => handleDeleteUser(selectedUser.id)}>
              Confirmar Eliminar
            </Button>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteUser;
