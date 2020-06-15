import React from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Grid, Header, Button, Icon } from 'semantic-ui-react';

const PlaylistsHeader = (props) => {

  const history = useHistory();
  const back = () => history.push('/');

  return (
    <Segment basic>
      <Header as='h2' icon textAlign='center' color="teal" >
        <Icon name='music' circular inverted color='teal' />
        <Header.Content>Playlists</Header.Content>
        <Header.Subheader>Musica da ascoltare</Header.Subheader>
      </Header>

      <Grid columns={2} >
        <Grid.Column>
          <Button onClick={back} icon="arrow left" fluid content="Back Home"></Button>
        </Grid.Column>
        <Grid.Column>
          <Button onClick={props.add} icon="plus" fluid color="teal" content="Add Playlist"></Button>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default PlaylistsHeader;