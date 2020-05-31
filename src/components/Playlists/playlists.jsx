import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Main, Button, DataTable, Box, Layer, Heading, Form, FormField, TextInput } from 'grommet';
import { FormPreviousLink } from 'grommet-icons';
import axios from 'axios';

const Playlists = () => {

  const history = useHistory();
  const [tableData, setTableData] = useState();
  const [open, setOpen] = useState();
  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();
  const [genre, setGenre] = useState();
  const [sort, setSort] = useState({
    property: "artist",
    direction: "desc"
  });

  useEffect(() => {
    axios.get('https://my-songs-backend.herokuapp.com/playlists/',
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } })
      .then(response => setTableData(response.data.result))
      .catch(error => console.log(error));
  }, [])

  const columns = [
    {
      property: 'artist',
      header: 'Artist',
    },
    {
      property: 'album',
      header: 'Album',
    },
    {
      property: 'genre',
      header: 'Genre',
    }
  ]

  const back = () => history.push('/');

  const update = (item) => {
    setOpen(true);
    setArtist(item.datum.artist);
    setAlbum(item.datum.album);
    setGenre(item.datum.genre);
  }

  const onClose = () => setOpen(false);

  const add = () => {
    setOpen(true);
    setArtist('');
    setAlbum('');
    setGenre('');
  }

  const submit = () => {
    axios.post('https://my-songs-backend.herokuapp.com/playlists/',
      { artist, album, genre },
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } })
      .then(response => console.log(response.data.result))
      .catch(error => console.log(error));
  }

  const deleteP = (id) => {
    axios.delete('https://my-songs-backend.herokuapp.com/playlists/5ed231ea6491d21cd5228ac1',
      { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } })
      .then(response => setTableData(response.data.result))
      .catch(error => console.log(error));
  }

  return (
    <Main pad="large">
      <Box direction="row" justify="between" margin={{ top: "medium" }}>
        <Button onClick={back} label={<Box><FormPreviousLink /></Box>} />
        <Button onClick={add} label="Add" primary />
        <Button onClick={deleteP} label="Delete" primary />
      </Box>

      <DataTable
        columns={columns}
        data={tableData}
        sort={sort}
        onSort={setSort}
        onClickRow={update}
      // resizeable
      />
      {open && (
        <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              Add Item
            </Heading>
            <Form onSubmit={submit}>
              <FormField label="Artist" name="artist" required>
                <TextInput name="artist" value={artist} onChange={event => setArtist(event.target.value)} />
              </FormField>
              <FormField label="Album" name="album" required>
                <TextInput name="album" value={album} onChange={event => setAlbum(event.target.value)} />
              </FormField>
              <FormField label="Genre" name="genre" required>
                <TextInput name="genre" value={genre} onChange={event => setGenre(event.target.value)} />
              </FormField>
              <Box
                as="footer"
                gap="small"
                direction="row"
                align="center"
                justify="end"
                pad={{ top: "medium", bottom: "small" }}
              >
                <Button type="reset" label="Reset" />
                <Button type="submit" label="Add" primary />
              </Box>
            </Form>
          </Box>
        </Layer>
      )}
    </Main>
  );

}

export default Playlists;