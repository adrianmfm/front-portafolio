const API_URL = 'http://localhost:8080'; 

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/usuario/getAllUsuarios`);
    if (!response.ok) {
      throw new Error('Error obteniendo users');
    }
    return response.json();
  } catch (error) {
    console.error('Error obteniendo users:', error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/usuario/usuarioById?id=${userId}`);
    if (!response.ok) {
      throw new Error(`Error obteniendo user con ID ${userId}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createUser = async (nombre, correo, contrasena, apaterno, amaterno, idRol) => {
  try {
    const response = await fetch(`${API_URL}/usuario/createUsuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nombre, correo, contrasena, apaterno, amaterno, idRol})
    });
    if (!response.ok) {
      throw new Error('Error creando user');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/usuario/usuarioById?id=${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Error eliminando user con ID ${userId}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const updateUserById = async (userId, nombre, correo, contrasena, apaterno, amaterno, idRol) => {
  try {
    const response = await fetch(`${API_URL}/usuario/usuarioById?id=${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, correo, contrasena, apaterno, amaterno, idRol })
    });
    if (!response.ok) {
      throw new Error(`Error actualizando user con ID ${userId}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }}



  //EMPIEZA LOS ENDPOINTS DE PRODUCTO


export const getAllProductos = async () => {
  try {
    const response = await fetch(`${API_URL}/producto/getAllProductos`);
    if (!response.ok){
      throw new Error('Error al obtener los productos');
    }
    return response.json();
  } catch (error) {
    console.error('Error obteniendo los productos', error);
    throw error;
  }
}


export const deleteProduct = async (idProducto) => {
  try {
    const response = await fetch(`${API_URL}/producto/deleteProducto?id=${idProducto}`, {
      method: 'DELETE'
    });
    if(!response.ok) {
      throw new Error(`Error eliminando producto con ID ${idProducto}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }

}


export const createProduct = async (nombre, precio, descripcion, stock, imagenUrl, idCategoria) => {
  try {
    const response = await fetch(`${API_URL}/producto/crearProducto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, precio, descripcion, stock, imagenUrl, idCategoria })
    });
    if (!response.ok) {
      throw new Error('Error creando producto');
    }
    return response.json();
  } catch (error) {
    console.error('Error creando producto:', error);
    throw error;
  }
};

export const updateProductById = async (id, nombre, precio, descripcion, stock, imagenUrl, idCategoria) => {
  try {
    const response = await fetch(`${API_URL}/producto/updateProducto`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, nombre, precio, descripcion, stock, imagenUrl, idCategoria })
    });
    if (!response.ok) {
      throw new Error(`Error actualizando producto con ID ${id}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error actualizando producto:', error);
    throw error;
  }
}



export const loginUser = async (email, password) => {
  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Error en obtener usuario');
    }

    const data = await response.json();
    if (data.success) {
      return {
        token: data.token,
        idRol: data.idRol
      };
    } else {
      throw new Error('Login fallido');
    }
  } catch (error) {
    console.error('Error en obtener usuario:', error);
    throw error;
  }
};
