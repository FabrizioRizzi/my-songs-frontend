import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Header, Button, Icon } from 'semantic-ui-react';

const Home = () => {

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('authToken');
    history.replace('/');
  };

  const goToPlaylists = () => history.push('/playlists');

  return (
    <>
      <Grid textAlign='center' style={{ background: '#eee' }} verticalAlign='middle' padded>
        <Header as='h2' icon textAlign="center">
          <Icon name="music"></Icon>
          <Header.Content>My Songs</Header.Content>
          <Header.Subheader>Gestisci la musica da ascoltare e da suonare</Header.Subheader>
        </Header>
      </Grid>

      <Button onClick={logout}>Logout</Button>
      <Button onClick={goToPlaylists} content='Playlists' icon="like" />
    </>
  );
}

export default Home;