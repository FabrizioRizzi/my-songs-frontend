import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Header, Grid, Segment, Form, Button, Icon } from 'semantic-ui-react';

const Login = () => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const submit = () => {
    setLoading(true);
    axios.post('https://my-songs-backend.herokuapp.com/authentication/login/', { email, password })
      .then(response => {
        localStorage.setItem('authToken', response.data.result.access_token);
        history.replace('/');
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  const onChangeEmail = (event) => setEmail(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);

  return (
    <Grid textAlign='center' style={{ height: '100vh', background: '#eee' }} verticalAlign='middle' padded>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' icon textAlign='center' color="teal">
          <Icon name='music' circular inverted color='teal' />
          <Header.Content>My Songs</Header.Content>
          <Header.Subheader>Gestisci la musica da ascoltare e da suonare</Header.Subheader>
        </Header>
        <Form onSubmit={submit} loading={loading}>
          <Segment>
            <Form.Input
              name="email"
              fluid icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              onChange={onChangeEmail}
              required
            />
            <Form.Input
              name="password"
              fluid icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={onChangePassword}
              required
            />
          </Segment>
          <Button type="submit" fluid size='large' color="teal">Log In</Button>
        </Form>
      </Grid.Column>
    </Grid>
  )
};

export default Login;