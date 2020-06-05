import axios from 'axios';

export const loggedInstance = axios.create({
  baseURL: 'https://my-songs-backend.herokuapp.com/',
  headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') }
});