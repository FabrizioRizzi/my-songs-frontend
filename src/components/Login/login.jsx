import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Form,
  FormField,
  MaskedInput,
  TextInput,
  Stack
} from "grommet";
import { Spinner } from '../Spinner/spinner'

const Login = () => {

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submit = (event) => {
    setLoading(true);
    axios.post('https://my-songs-backend.herokuapp.com/authentication/login/', event.value)
      .then(response => {
        localStorage.setItem('authToken', response.data.result.access_token);
        history.replace('/');
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <Stack anchor="center">
      <Box fill align="center" justify="center" pad="large">
        <Box width="medium">
          <Form onSubmit={submit}>
            <FormField label="Email" name="email" required>
              <MaskedInput
                name="email"
                mask={[
                  { regexp: /^[\w\-_.]+$/, placeholder: "example" },
                  { fixed: "@" },
                  { regexp: /^[\w]+$/, placeholder: "my" },
                  { fixed: "." },
                  { regexp: /^[\w]+$/, placeholder: "com" }
                ]}
              />
            </FormField>
            <FormField label="Password" name="password" required>
              <TextInput name="password" type="password" />
            </FormField>
            <Box direction="row" justify="between" margin={{ top: "medium" }}>
              <Button type="reset" label="Reset" />
              <Button type="submit" disabled={loading} label={loading ? <Spinner color="#fff" /> : "Log In"} primary />
            </Box>
          </Form>
        </Box>
      </Box>
    </Stack>
  )
};

export default Login;