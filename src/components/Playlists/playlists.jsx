import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Main, Button, DataTable, Box, Layer, Heading, Form, FormField, TextInput, Select, Header, Stack } from 'grommet';
import { FormPreviousLink } from 'grommet-icons';
import { Spinner } from '../Spinner/spinner';
import { Rating } from '../Rating/rating';
import { loggedInstance } from '../../axiosConfig';

const Playlists = () => {

  const history = useHistory();

  const [tableData, setTableData] = useState();
  const [loadingData, setLoadingData] = useState();

  const [open, setOpen] = useState();

  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();
  const [genre, setGenre] = useState();
  const [rating, setRating] = useState();
  const [id, setId] = useState();
  const [loadingCrud, setLoadingCrud] = useState();
  const [sort, setSort] = useState({
    property: "artist",
    direction: "asc"
  });
  const columns = [
    { property: 'artist', header: 'Artist', },
    { property: 'album', header: 'Album', },
    { property: 'genre', header: 'Genre', },
    { property: 'rating', header: 'Rating', size: "60px", align: "center", render: item => <Rating value={item.rating} /> }
  ]

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
    setArtist(item.datum.artist);
    setAlbum(item.datum.album);
    setGenre(item.datum.genre);
    setRating(item.datum.rating?.toString());
    setId(item.datum._id.$oid);
  }

  const onClose = () => setOpen(false);

  const AddUpdatePlaylists = () => {
    setLoadingCrud(true);
    if (id) {
      loggedInstance.put('playlists/' + id, { artist, album, genre, rating })
        .then(response => {
          loadPlaylists();
          onClose();
        })
        .catch(error => console.log(error))
        .finally(() => setLoadingCrud(false));
    } else {
      loggedInstance.post('playlists/', { artist, album, genre, rating })
        .then(response => {
          loadPlaylists();
          onClose();
        })
        .catch(error => console.log(error))
        .finally(() => setLoadingCrud(false));
    }
  }

  const deletePlaylist = () => {
    setLoadingCrud(true);
    loggedInstance.delete('playlists/' + id)
      .then(response => {
        loadPlaylists();
        onClose();
      })
      .catch(error => console.log(error))
      .finally(() => setLoadingCrud(false));
  }

  return (
    <Main>
      <Stack anchor="top">
        <Header justify="between" pad="medium" fixed="true">
          <Button onClick={back} label={<Box><FormPreviousLink /></Box>} />
          <Heading level={2} margin="xsmall">Playlists</Heading>
          <Button onClick={add} label="Add" primary />
        </Header>
      </Stack>
      {loadingData ? <Spinner /> :
        (
          <Main>
            <DataTable
              columns={columns}
              data={tableData}
              sort={sort}
              onSort={setSort}
              onClickRow={update}
              pad="xsmall"
              border="horizontal"
              background={{
                header: "light-5",
              }}
            />
          </Main>)
      }

      {open && (
        <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3}>Add Item</Heading>
            <Form onSubmit={AddUpdatePlaylists}>
              <FormField label="Artist" name="artist" required>
                <TextInput name="artist" value={artist} onChange={event => setArtist(event.target.value)} />
              </FormField>
              <FormField label="Album" name="album" required>
                <TextInput name="album" value={album} onChange={event => setAlbum(event.target.value)} />
              </FormField>
              <FormField label="Genre" name="genre">
                <TextInput name="genre" value={genre} onChange={event => setGenre(event.target.value)} />
              </FormField>
              <FormField label="Rating" name="rating">
                <Select name="rating" value={rating} options={["0", "1", "2", "3", "4", "5"]} onChange={({ option }) => setRating(option)} />
              </FormField>
              <Box
                as="footer"
                gap="small"
                direction="row"
                align="center"
                justify="between"
                pad={{ top: "medium", bottom: "small" }}
              >
                <Button
                  onClick={onClose}
                  label="Close"
                />
                {id ? (<Button
                  onClick={deletePlaylist}
                  label={loadingCrud ? <Spinner color="#fff" /> : "Delete"}
                  primary
                  disabled={loadingCrud}
                  color="status-critical" />) : ''}
                <Button
                  type="submit"
                  label={loadingCrud ? <Spinner color="#fff" /> : id ? 'Update' : 'Add'}
                  disabled={loadingCrud}
                  primary />
              </Box>
            </Form>
          </Box>
        </Layer>
      )}
    </Main>
  );

}

export default Playlists;