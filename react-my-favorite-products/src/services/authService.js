import axios from 'axios';

const API_URL = 'http://localhost:3000';

const register = async ({ name, email, password }) => {
  const response = await axios.post(`${API_URL}/users`, {
    name,
    email,
    password,
  });

  return response.data;
};

const login = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    email,
    password,
  });

  const user = response.data;

  localStorage.setItem('user', JSON.stringify(user));

  return user;
};

export default {
  register,
  login,
};
