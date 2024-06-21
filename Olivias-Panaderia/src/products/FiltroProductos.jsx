import React, { useState } from 'react';
import { Box, TextField, FormControlLabel, Checkbox, Button, CircularProgress, Typography, MenuItem, Select } from '@mui/material';
import axios from 'axios';

const estilos = {
  card: {
    padding: '1rem',
    margin: '1rem 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  container: {
    padding: '1rem',
    margin: '0 auto',
    maxWidth: '400px',
  },
  select: {
    marginTop: '1rem',
  },
  button: {
    marginTop: '1rem',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': { backgroundColor: 'darkgrey' }
  }
};

const FiltroProductos = () => {
  const [filtros, setFiltros] = useState({
    nombre: '',
    categoria: '',
    minPrecio: '',
    maxPrecio: '',
    precioOrden: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.checked ? e.target.value : '',
    });
  };

  const handleFiltrar = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/producto/getProductoByFilter', {
        params: filtros,
      });
      console.log(response.data); // Aquí puedes manejar los datos de la respuesta según sea necesario
    } catch (error) {
      console.error('Error al filtrar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={estilos.container}>
      <Box sx={estilos.card}>
        <Typography variant="h6" component="h2" gutterBottom>Filtrar Productos</Typography>
        <TextField
          fullWidth
          label="Nombre"
          name="nombre"
          value={filtros.nombre}
          onChange={handleChange}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="categoria"
              value="sin_gluten"
              checked={filtros.categoria === 'sin_gluten'}
              onChange={handleCheckboxChange}
            />
          }
          label="Sin Gluten"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="categoria"
              value="sin_azucar"
              checked={filtros.categoria === 'sin_azucar'}
              onChange={handleCheckboxChange}
            />
          }
          label="Sin Azúcar"
        />
        <TextField
          fullWidth
          label="Precio Mínimo"
          name="minPrecio"
          type="number"
          value={filtros.minPrecio}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Precio Máximo"
          name="maxPrecio"
          type="number"
          value={filtros.maxPrecio}
          onChange={handleChange}
          margin="normal"
        />
        <Select
          fullWidth
          name="precioOrden"
          value={filtros.precioOrden}
          onChange={handleChange}
          displayEmpty
          sx={estilos.select}
        >
          <MenuItem value="" disabled>Ordenar por precio</MenuItem>
          <MenuItem value="asc">Ascendente</MenuItem>
          <MenuItem value="desc">Descendente</MenuItem>
        </Select>
        <Button
          fullWidth
          variant="contained"
          sx={estilos.button}
          onClick={handleFiltrar}
        >
          {loading ? <CircularProgress size={24} /> : 'Filtrar'}
        </Button>
      </Box>
    </Box>
  );
};

export default FiltroProductos;
