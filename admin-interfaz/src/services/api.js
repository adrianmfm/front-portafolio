const API_URL = 'http://localhost:3000'; 

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/usuarios`);
    if (!response.ok) {
      throw new Error('Error fetching users');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/usuario/${userId}`);
    if (!response.ok) {
      throw new Error(`Error fetching user with ID ${userId}`);
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
      throw new Error('Error creating user');
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
      throw new Error(`Error deleting user with ID ${userId}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
