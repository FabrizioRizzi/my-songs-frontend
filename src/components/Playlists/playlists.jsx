import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Rating, Modal, Header, Button, Loader, Confirm, Icon, Dimmer, Form } from 'semantic-ui-react';
import { loggedInstance } from '../../axiosConfig';
import RatingNew from '../RatingNew/ratingNew';

const Playlists = () => {

  const history = useHistory();

  const [tableData, setTableData] = useState();
  const [loadingData, setLoadingData] = useState();

  const [open, setOpen] = useState();
  const [openDelete, setOpenDelete] = useState();

  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();
  const [genre, setGenre] = useState();
  const [rating, setRating] = useState();
  const [id, setId] = useState();
  const [loadingCrud, setLoadingCrud] = useState();

  const [column, setColumn] = useState();
  const [direction, setDirection] = useState();

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

  useEffect(() => loadPlaylists(), [])

  const loadPlaylists = () => {
    setLoadingData(true);
    loggedInstance.get('playlists/')
      .then(response => setTableData(response.data.result))
      .catch(error => console.log(error))
      .finally(() => setLoadingData(false));
  }

  const back = () => history.push('/');

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
        .then(response => {
          loadPlaylists();
          onClose();
          setDirection(null);
          setColumn(null);
        })
        .catch(error => console.log(error))
        .finally(() => setLoadingCrud(false));
    } else {
      loggedInstance.post('playlists/', { artist, album, genre, rating })
        .then(response => {
          loadPlaylists();
          onClose();
          setDirection(null);
          setColumn(null);
        })
        .catch(error => console.log(error))
        .finally(() => setLoadingCrud(false));
    }
  }

  const onDelete = (id) => {
    setId(id);
    setOpenDelete(true);
  }

  const deletePlaylist = () => {
    setLoadingCrud(true);
    loggedInstance.delete('playlists/' + id)
      .then(response => {
        loadPlaylists();
        setOpenDelete(false);
        setDirection(null);
        setColumn(null);
      })
      .catch(error => console.log(error))
      .finally(() => setLoadingCrud(false));
  }

  return (
    <>
      <Dimmer active={loadingData} inverted>
        <Loader />
      </Dimmer>

      <Header as='h2' icon textAlign='center' color="teal">
        <Icon name='music' circular inverted color='teal' />
        <Header.Content>Playlists</Header.Content>
        <Header.Subheader>Musica da ascoltare</Header.Subheader>
      </Header>

      <Button onClick={back} icon="arrow left" size="small"></Button>
      <Button onClick={add} icon="plus" size="small"></Button>

      <Table sortable textAlign="center" color="teal">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'artist' ? direction : null}
              onClick={handleSort('artist')}>
              Artist
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'album' ? direction : null}
              onClick={handleSort('album')}>Album</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'genre' ? direction : null}
              onClick={handleSort('genre')}>Genre</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'rating' ? direction : null}
              onClick={handleSort('rating')}>Rating</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableData?.map((p, i) => {
            return (
              <Table.Row key={i}>
                <Table.Cell>{p.artist}</Table.Cell>
                <Table.Cell>{p.album}</Table.Cell>
                <Table.Cell>{p.genre}</Table.Cell>
                <Table.Cell>
                  <RatingNew rating={p.rating}></RatingNew>
                </Table.Cell>
                <Table.Cell icon="delete" onClick={() => onDelete(p._id.$oid)}></Table.Cell>
                <Table.Cell icon="edit" onClick={() => update(p)}></Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>

      <Confirm
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        onConfirm={deletePlaylist}
      />

      <Modal open={open}>
        <Modal.Header>{id ? 'Update Playlist' : 'Add Playlist'}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={addUpdatePlaylists} loading={loadingCrud}>
            <Form.Input name="artist" value={artist} placeholder='Artist' onChange={onChangeArtist} required />
            <Form.Input name="album" value={album} placeholder='Album' onChange={onChangeAlbum} required />
            <Form.Input name="genre" value={genre} placeholder='Genre' onChange={onChangeGenre} />
            <Rating icon="stars" color="teal" defaultRating={rating} maxRating={5} onRate={onChangeRating} clearable></Rating>
            <Button type="submit" fluid size='large' color="teal">{id ? 'Update' : 'Add'}</Button>
          </Form>
          <Button onClick={onClose}>Close</Button>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default Playlists;