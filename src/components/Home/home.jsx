import React from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Grid, Header, Button, Icon, Divider } from 'semantic-ui-react';

const Home = () => {

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('authToken');
    history.replace('/');
  };

  const goToPlaylists = () => history.push('/playlists');
  const goToSongs = () => history.push('/songs');

  return (
    <>
      <Segment textAlign='center' style={{ background: '#eee' }} padded >
        <Header as='h2' icon textAlign="center" color="blue">
          <Icon name="music"></Icon>
          <Header.Content>My Songs</Header.Content>
          <Header.Subheader>Gestisci la musica da ascoltare e da suonare</Header.Subheader>
        </Header>
        <Button onClick={logout} icon="log out" content="Log Out" />
      </Segment>

      <Segment basic>
        <Grid columns={2} textAlign='center' container>
          <Divider vertical>Or</Divider>
          <Grid.Row >
            <Grid.Column onClick={goToSongs}>
              <Header as='h2' icon color="olive">
                <Icon name='play' circular inverted color='olive' />
                <Header.Content>Songs</Header.Content>
                <Header.Subheader>Musica da suonare</Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column onClick={goToPlaylists}>
              <Header as='h2' icon color="teal">
                <Icon name='headphones' circular inverted color='teal' />
                <Header.Content>Playlists</Header.Content>
                <Header.Subheader>Musica da ascoltare</Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
}

export default Home;