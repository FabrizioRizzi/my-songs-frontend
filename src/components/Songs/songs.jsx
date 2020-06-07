import React from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Header, Icon, Grid, Button } from 'semantic-ui-react';

const Songs = () => {

  const history = useHistory();
  const back = () => history.push('/');

  return (
    <Segment padded attached>
      <Header as='h2' icon textAlign='center' color="olive" >
        <Icon name='music' circular inverted color='olive' />
        <Header.Content>Songs</Header.Content>
        <Header.Subheader>Musica da suonare</Header.Subheader>
      </Header>

      <Grid columns={2} >
        <Grid.Column>
          <Button onClick={back} icon="arrow left" fluid content="Back Home"></Button>
        </Grid.Column>
        <Grid.Column>
          <Button icon="plus" fluid color="olive" content="Add Song"></Button>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default Songs;