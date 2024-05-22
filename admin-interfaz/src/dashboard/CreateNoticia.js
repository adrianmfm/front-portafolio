import React, { useState } from 'react';
import { createNoticia } from '../services/api'; // Importa la función para crear noticias
import { Form, Button, Alert, Modal } from 'react-bootstrap';

const CreateNoticia = () => {
  const initialFormData = {
    titulo: '',
    subtitulo: '',
    contenido: '',
    url_imagen: '' // Agrega el campo para la URL de la imagen
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { titulo, subtitulo, contenido, url_imagen } = formData;

    if (!titulo.trim() || !subtitulo.trim() || !contenido.trim() || !url_imagen.trim()) {
      setErrorMessage('Todos los campos son requeridos');
      return; // Detener la función si hay campos vacíos
    }

    try {
      await createNoticia(titulo, subtitulo, contenido, url_imagen); // Llama a la función para crear la noticia
      setErrorMessage('');
      setShowModal(true); // Mostrar el modal de confirmación
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error creando noticia:', error.message);
      setErrorMessage('Error creando noticia. Por favor, inténtalo de nuevo.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShowModal(true)}>
        Crear Noticia
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Noticia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitulo">
              <Form.Label>Título:</Form.Label>
              <Form.Control type="text" name="titulo" value={formData.titulo} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group controlId="formSubtitulo">
              <Form.Label>Subtítulo:</Form.Label>
              <Form.Control type="text" name="subtitulo" value={formData.subtitulo} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group controlId="formContenido">
              <Form.Label>Contenido:</Form.Label>
              <Form.Control as="textarea" rows={3} name="contenido" value={formData.contenido} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group controlId="formUrlImagen">
              <Form.Label>URL de la Imagen:</Form.Label>
              <Form.Control type="text" name="url_imagen" value={formData.url_imagen} onChange={handleChange} required/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Crear Noticia
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateNoticia;
