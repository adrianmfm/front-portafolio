const API_URL = 'http://localhost:3001'; 
const API_URL_2 = 'http://localhost:3002'; 

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/usuarios`);
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
    const response = await fetch(`${API_URL}/usuario/${userId}`);
    if (!response.ok) {
      throw new Error(`Error obteniendo user con ID ${userId}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createUser = async (nombre, correo, contrasena, apaterno, amaterno) => {
  try {
    const response = await fetch(`${API_URL}/usuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nombre, correo, contrasena, apaterno, amaterno})
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
    const response = await fetch(`${API_URL}/usuario/${userId}`, {
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

export const updateUserById = async (userId, nombre, correo, contrasena, apaterno, amaterno) => {
  try {
    const response = await fetch(`${API_URL}/usuario/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, correo, contrasena, apaterno, amaterno })
    });
    if (!response.ok) {
      throw new Error(`Error actualizando user con ID ${userId}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }}


  //EMPIEZA LOS ENDPOINT DE NOTICIAS

  export const getNoticias = async () => {
    try {
      const response = await fetch(`${API_URL_2}/noticias`);
      if (!response.ok) {
        throw new Error('Error obteniendo noticias');
      }
      return response.json();
    } catch (error) {
      console.error('Error obteniendo noticias:', error);
      throw error;
    }};

    export const getNoticiasById = async (noticiaId) => {
      try {
        const response = await fetch(`${API_URL_2}/noticia/${noticiaId}`);
        if (!response.ok) {
          throw new Error(`Error obteniendo noticia con ID ${noticiaId}`);
        }
        return response.json();
      } catch (error) {
        throw error;
      }
    };

    export const createNoticia = async (titulo, subtitulo, contenido, url_imagen) => {
      try {
        const response = await fetch(`${API_URL_2}/crear-noticia`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({titulo, subtitulo, contenido, url_imagen})
        });
        if (!response.ok) {
          throw new Error('Error creando noticias');
        }
        return response.json();
      } catch (error) {
        throw error;
      }
    };


