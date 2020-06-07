import axios from 'axios';

export const loggedInstance = axios.create({
  baseURL: 'https://my-songs-backend.herokuapp.com/'
});

loggedInstance.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('authToken');
  return config;
});