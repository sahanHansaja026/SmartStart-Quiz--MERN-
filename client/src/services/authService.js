import axios from 'axios';

const API_URL = 'http://localhost:9000/api/auth';

const login = async (credentials) => {
  const { data } = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem('token', data.token);
};

const register = async (userData) => {
  await axios.post(`${API_URL}/register`, userData);
};

const getUserData = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const { data } = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

export default { login, register, getUserData };
