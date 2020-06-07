import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Table, Rating, Modal, Header, Button, Loader, Icon, Dimmer, Form, Divider, Segment } from 'semantic-ui-react';
import { loggedInstance } from '../../axiosConfig';
import RatingNew from '../RatingNew/ratingNew';

const Playlists = () => {

  const history = useHistory();
  const back = () => history.push('/');

  const [tableData, setTableData] = useState();
  const [loadingData, setLoadingData] = useState();

  const [open, setOpen] = useState();
  const [confirmDelete, setConfirmDelete] = useState();

  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();
  const [genre, setGenre] = useState();
  const [rating, setRating] = useState();
  const [id, setId] = useState();
  const [loadingCrud, setLoadingCrud] = useState();

  const [column, setColumn] = useState();
  const [direction, setDirection] = useState();

  useEffect(() => loadPlaylists(), [])

  const loadPlaylists = () => {
    setOpen(false);
    setLoadingData(true);
    loggedInstance.get('playlists/')
      .then(response => {
        setTableData(response.data.result.sort((a, b) => a.artist < b.artist ? -1 : 1));
        setDirection('ascending');
        setColumn('artist');
      })
      .catch(error => console.log(error))
      .finally(() => setLoadingData(false));
  }

  const add = () => {
    setOpen(true);
    setArtist('');
    setAlbum('');
    setGenre('');
    setRating("0");
    setId('');
  }

  const update = (item) => {
    setOpen(true);
    setConfirmDelete(false);
    setArtist(item.artist);
    setAlbum(item.album);
    setGenre(item.genre);
    setRating(item.rating);
    setId(item._id.$oid);
  }

  const onClose = () => setOpen(false);

  const onChangeArtist = (event) => setArtist(event.target.value);
  const onChangeAlbum = (event) => setAlbum(event.target.value);
  const onChangeGenre = (event) => setGenre(event.target.value);
  const onChangeRating = (e, { rating }) => setRating(rating);

  const addUpdatePlaylists = () => {
    setLoadingCrud(true);
    if (id) {
      loggedInstance.put('playlists/' + id, { artist, album, genre, rating })
        .then(response => loadPlaylists())
        .catch(error => console.log(error))
        .finally(() => setLoadingCrud(false));
    } else {
      loggedInstance.post('playlists/', { artist, album, genre, rating })
        .then(response => loadPlaylists())
        .catch(error => console.log(error))
        .finally(() => setLoadingCrud(false));
    }
  }

  const onDelete = () => setConfirmDelete(true);

  const deletePlaylist = () => {
    setConfirmDelete(false);
    setLoadingCrud(true);
    loggedInstance.delete('playlists/' + id)
      .then(response => loadPlaylists())
      .catch(error => console.log(error))
      .finally(() => setLoadingCrud(false));
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
            <Button onClick={add} icon="plus" fluid color="teal" content="Add Playlist"></Button>
          </Grid.Column>
        </Grid>
      </Segment>

      <Table sortable textAlign="center" color="teal" unstackable selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'artist' ? direction : null}
              onClick={handleSort('artist')}>Artist</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'album' ? direction : null}
              onClick={handleSort('album')}>Album</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'genre' ? direction : null}
              onClick={handleSort('genre')}>Genre</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'rating' ? direction : null}
              onClick={handleSort('rating')}>Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableData?.map((playlist, i) => {
            return (
              <Table.Row key={i} onClick={() => update(playlist)}>
                <Table.Cell>{playlist.artist}</Table.Cell>
                <Table.Cell>{playlist.album}</Table.Cell>
                <Table.Cell>{playlist.genre}</Table.Cell>
                <Table.Cell singleLine>
                  <RatingNew rating={playlist.rating}></RatingNew>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>

      <Modal open={open}>
        <Modal.Header>{id ? 'Update Playlist' : 'Add Playlist'}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={addUpdatePlaylists} loading={loadingCrud}>
            <Form.Input label='Artist' name="artist" value={artist} placeholder='Artist' onChange={onChangeArtist} required />
            <Form.Input label='Album' name="album" value={album} placeholder='Album' onChange={onChangeAlbum} required />
            <Form.Input label='Genre' name="genre" value={genre} placeholder='Genre' onChange={onChangeGenre} />
            <Form.Field>
              Rating: <Rating icon="star" color="teal" defaultRating={rating} maxRating={5} onRate={onChangeRating} clearable></Rating>
            </Form.Field>
            {id ?
              (<Button.Group fluid>
                <Button type="submit" positive>Update</Button>
                <Button.Or text='O' />
                {!confirmDelete ? (<Button onClick={onDelete} negative>Delete</Button>) : ''}
                {confirmDelete ? (<Button onClick={deletePlaylist} negative>Confirm Delete?</Button>) : ''}
              </Button.Group>) :
              (<Button type="submit" fluid positive>{id ? 'Update' : 'Add'}</Button>)}
          </Form>
          <Divider horizontal>Close</Divider>
          <Button onClick={onClose} fluid>Close</Button>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default Playlists;