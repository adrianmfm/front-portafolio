import axios from 'axios';
//OBTIENE LOS POST DE INSTAGRAM
const API_URL = 'http://localhost:3002/media';

 const getInstagramPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    throw error;
  }
};
export default getInstagramPosts

//EMPIEZA LA API DE PRODUCTOS 


const API_URL_JAVA = 'http://localhost:8080';

export const getAllProductos = async () => {
  try {
    const response = await axios.get(`${API_URL_JAVA}/producto/getAllProductos`);
    return response.data; 
  } catch (error) {
    throw new Error('Error fetching products: Network Error');
  }
};


export const getProductoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL_JAVA}/producto/getProductoById`, {
      params: { id } 
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching product details: Network Error');
  }
};

//API PARA ENVIAR DATOS DE CLIENTES EN NEWSLETTER 
export const suscribirCliente = async (nombre, correo) => {
  const response = await axios.post(`${API_URL_JAVA}/newsletter/suscribe`, { nombre, correo }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.data) {
    throw new Error('Error suscribiendo usuario');
  }

  return response.data;
};

export const getSubscribers = async () => {
  try {
    const response = await fetch(`${API_URL_JAVA}/newsletter/getSubscribers`);
    if (!response.ok) {
      throw new Error('Error obteniendo suscribers');
    }
    console.log(response)
    return response.json();
  } catch (error) {
    console.error('Error obteniendo suscribers:', error);
    throw error;
  }
};


export const getSellDetail = async (idVenta) => {
  try {
    const response = await axios.get(`${API_URL_JAVA}/venta/getSellDetail?idVenta=${idVenta}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles de la venta:", error);
    throw error;
  }
};



//Api transbank 

export const pagoWebpay = async (lista, despacho) => {
  const response = await axios.post(`${API_URL_JAVA}/venta/pay`,{
    despacho: despacho,
    productos: lista
  },  {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.data) {
    throw new Error('Error en el pago');
  }

  return response.data;
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
