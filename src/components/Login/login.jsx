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

const defaultValue = {
  email: "",
  password: "",
};

const Login = () => {

  const history = useHistory();
  const [value, setValue] = useState(defaultValue);

  const submit = () => {
    axios.post('https://my-songs-backend.herokuapp.com/authentication/login/', value)
      .then((response) => {
        localStorage.setItem('authToken', response.data.result.access_token);
        history.replace('/');
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (
    <div>
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            value={value}
            onChange={nextValue => {
              console.log("Change", nextValue);
              setValue(nextValue);
            }}
            onReset={() => setValue(defaultValue)}
            onSubmit={event =>
              console.log("Submit", event.value, event.touched)
            }
          >
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
            <FormField label="Password" name="password" type="password" required />
            <Box direction="row" justify="between" margin={{ top: "medium" }}>

              <Button type="reset" label="Reset" primary />
              <Button type="submit" label="Log In" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    </div>
  )
};

export default Login;