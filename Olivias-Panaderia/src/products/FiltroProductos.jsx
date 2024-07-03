import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, IconButton, Card, CardContent } from '@mui/material';
import { getProductoByFilter } from '../services/api';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const FiltroProductos = ({ setFilteredProductos, setFilterState, clearFilters, orderProducts }) => {
  const [nombre, setNombre] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [minPrecio, setMinPrecio] = useState('');
  const [maxPrecio, setMaxPrecio] = useState('');
  const [order, setOrder] = useState('asc');

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleFilter = async () => {
    const filters = { nombre, idCategoria, minPrecio: minPrecio ? parseInt(minPrecio, 10) : null, maxPrecio: maxPrecio ? parseInt(maxPrecio, 10) : null };
    setFilterState(filters);
    const filteredProducts = await getProductoByFilter(filters);
    setFilteredProductos(filteredProducts);
  };

  const handleClearFilters = () => {
    setNombre('');
    setIdCategoria('');
    setMinPrecio('');
    setMaxPrecio('');
    clearFilters();
  };

  const handleOrderChange = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    orderProducts(newOrder);
  };

  return (
    <Card sx={{ padding: 2, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Filtro
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body1">Ordenar por precio</Typography>
            <IconButton onClick={handleOrderChange}>
              {order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            </IconButton>
          </Box>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={handleFilterChange(setNombre)}
            variant="outlined"
            fullWidth
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={idCategoria}
              onChange={handleFilterChange(setIdCategoria)}
              label="Categoría"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={1}>Sin Azúcar</MenuItem>
              <MenuItem value={2}>Sin Lácteos</MenuItem>
              <MenuItem value={3}>Sin Gluten</MenuItem>
              <MenuItem value={4}>Sin Nueces</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Precio Mínimo"
            value={minPrecio}
            onChange={handleFilterChange(setMinPrecio)}
            variant="outlined"
            type="number"
            fullWidth
          />
          <TextField
            label="Precio Máximo"
            value={maxPrecio}
            onChange={handleFilterChange(setMaxPrecio)}
            variant="outlined"
            type="number"
            fullWidth
          />
          <Button variant="contained" onClick={handleFilter} sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkgrey' } }}>
            Filtrar
          </Button>
          <Button variant="contained" onClick={handleClearFilters} sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkgrey' } }}>
            Limpiar Filtro
          </Button>
         
        </Box>
      </CardContent>
    </Card>
  );
};

export default FiltroProductos;
