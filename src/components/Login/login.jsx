import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Grommet,
  Form,
  FormField,
  MaskedInput,
  TextInput
} from "grommet";


const Login = () => {

  const history = useHistory();

  const clicca = () => {

    const data = { email: "fabrizio@fabriziorizzi.it", password: "mysongs9" };

    axios.post('https://my-songs-backend.herokuapp.com/authentication/login/', data)
      .then(function (response) {
        console.log(response);

        localStorage.setItem('authToken', response.data.result.access_token);
        history.replace('/');
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (
    <div>
      <div>Login</div>
      <Button onClick={clicca} label="setToken" primary />
    </div>
  )
};

export default Login;