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
    console.log('Response from API:', response.data);
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
    console.log('respuesta',response.data)
    return response.data;
  } catch (error) {
    throw new Error('Error fetching product details: Network Error');
  }
};