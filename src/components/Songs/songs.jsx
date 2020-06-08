import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Header, Icon, Grid, Button, Table, Dimmer, Loader } from 'semantic-ui-react';
import RatingNew from '../RatingNew/ratingNew';
import { loggedInstance } from '../../axiosConfig';

const Songs = () => {

  const history = useHistory();
  const back = () => history.push('/');

  const [tableData, setTableData] = useState();
  const [loadingData, setLoadingData] = useState();



  const [column, setColumn] = useState();
  const [direction, setDirection] = useState();

  useEffect(() => loadSongs(), [])

  const loadSongs = () => {
    //setOpen(false);
    setLoadingData(true);
    loggedInstance.get('songs/')
      .then(response => {
        setTableData(response.data.result.sort((a, b) => a.artist < b.artist ? -1 : 1));
        setDirection('ascending');
        setColumn('artist');
      })
      .catch(error => console.log(error))
      .finally(() => setLoadingData(false));
  }


  const handleSort = (clickedColumn) => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setTableData(tableData.sort((a, b) => a[clickedColumn] < b[clickedColumn] ? -1 : 1));
      setDirection('ascending');
    } else {
      setTableData(tableData.reverse());
      setDirection(direction === 'ascending' ? 'descending' : 'ascending')
    }
  }

  return (
    <>
      <Dimmer active={loadingData} inverted>
        <Loader>Loading...</Loader>
      </Dimmer>

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
            <Button icon="plus" fluid color="olive" content="Add Song"></Button>
          </Grid.Column>
        </Grid>
      </Segment>

      <Table sortable textAlign="center" color="olive" unstackable selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'artist' ? direction : null}
              onClick={handleSort('artist')}>Artist</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'title' ? direction : null}
              onClick={handleSort('title')}>Title</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'difficulty' ? direction : null}
              onClick={handleSort('difficulty')}>Difficulty</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableData?.map((song, i) => {
            return (
              <Table.Row key={i}>
                <Table.Cell>{song.artist}</Table.Cell>
                <Table.Cell>{song.title}</Table.Cell>
                <Table.Cell singleLine>
                  <RatingNew rating={song.difficulty}></RatingNew>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default Songs;