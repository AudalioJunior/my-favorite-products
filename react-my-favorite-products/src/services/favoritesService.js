import axios from 'axios';

const API_URL = 'http://localhost:3000/favorite-lists';

const createFavoriteList = async (payload) => {
  const response = await axios.post(API_URL, payload);
  return response.data;
};

const getListByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data.data;
};

const updateList = async (id, { title, description }) => {
  const response = await axios.put(`${API_URL}/${id}`, {
    title,
    description,
  });
  return response.data.data;
};

const deleteList = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  createFavoriteList,
  getListByUserId,
  updateList,
  deleteList
};