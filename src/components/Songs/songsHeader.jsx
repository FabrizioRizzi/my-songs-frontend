import React from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Grid, Header, Button, Icon } from 'semantic-ui-react';

const SongsHeader = (props) => {

  const history = useHistory();
  const back = () => history.push('/');

  return (
    <Segment padded basic>
      <Header as='h2' icon textAlign='center' color="olive" >
        <Icon name='play' circular inverted color='olive' />
        <Header.Content>Songs</Header.Content>
        <Header.Subheader>Musica da suonare</Header.Subheader>
      </Header>

      <Grid columns={2} >
        <Grid.Column>
          <Button onClick={back} icon="arrow left" fluid content="Back Home"></Button>
        </Grid.Column>
        <Grid.Column>
          <Button onClick={props.add} icon="plus" fluid color="olive" content="Add Song"></Button>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default SongsHeader;
