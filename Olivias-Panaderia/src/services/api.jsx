import axios from 'axios';

// URL base para las APIs
const API_URL_INSTAGRAM = 'http://localhost:3002/media';
const API_URL_JAVA = 'http://localhost:8080';

// OBTIENE LOS POST DE INSTAGRAM
const getInstagramPosts = async () => {
  try {
    const response = await axios.get(API_URL_INSTAGRAM);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    throw error;
  }
};
export default getInstagramPosts;

// EMPIEZA LA API DE PRODUCTOS 

// Obtiene todos los productos
export const getAllProductos = async () => {
  try {
    const response = await axios.get(`${API_URL_JAVA}/producto/getAllProductos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products: Network Error');
  }
};

// Obtiene un producto por su ID
export const getProductoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL_JAVA}/producto/getProductoById`, {
      params: { id }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw new Error('Error fetching product details: Network Error');
  }
};

// Obtiene productos filtrados según los filtros especificados
export const getProductoByFilter = async (filters) => {
  try {
    const response = await axios.post(`${API_URL_JAVA}/producto/getProductoByFilter`, filters);
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    throw new Error('Error fetching filtered products: Network Error');
  }
};

// Obtiene un producto por su nombre
export const getProductoByName = async (nombre) => {
  try {
    const response = await axios.get(`${API_URL_JAVA}/producto/getProductoByName`, {
      params: { nombre }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product by name:', error);
    throw new Error('Error fetching product by name: Network Error');
  }
};

// API PARA ENVIAR DATOS DE CLIENTES EN NEWSLETTER 
export const suscribirCliente = async (nombre, correo) => {
  try {
    const response = await axios.post(`${API_URL_JAVA}/newsletter/suscribe`, { nombre, correo }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.data) {
      throw new Error('Error suscribiendo usuario');
    }

    return response.data;
  } catch (error) {
    console.error('Error suscribiendo usuario:', error);
    throw new Error('Error suscribiendo usuario');
  }
};

// Obtiene los suscriptores de la newsletter
export const getSubscribers = async () => {
  try {
    const response = await axios.get(`${API_URL_JAVA}/newsletter/getSubscribers`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo suscribers:', error);
    throw new Error('Error obteniendo suscribers');
  }
};

// API para realizar un pago con Transbank
export const pagoWebpay = async (lista) => {
  try {
    const response = await axios.post(`${API_URL_JAVA}/venta/pay`, lista, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.data) {
      throw new Error('Error en el pago');
    }

    return response.data;
  } catch (error) {
    console.error('Error en el pago:', error);
    throw new Error('Error en el pago');
  }
};
