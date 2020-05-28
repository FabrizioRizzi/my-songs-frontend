import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Form,
  FormField,
  MaskedInput,
  TextInput
} from "grommet";

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
    <div>
      <Box fill align="center" justify="center" pad="large">
        <Box width="medium">
          {loading ? 'Loading' : ''}
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
              <Button type="submit" label="Log In" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    </div>
  )
};

export default Login;