import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Dimmer, Loader, Modal } from 'semantic-ui-react';
import { loggedInstance } from '../../axiosConfig';
import SongsInfo from './songsInfo';
import SongsHeader from './songsHeader';
import SongsTable from './songsTable';
import SongsCrud from './songsCrud';

const defaultSong = {
  artist: '',
  title: '',
  difficulty: "0",
  acoustic: false,
  dfm: false,
  backing: false,
  tab: false,
  notes: ''
}

const Songs = () => {

  const history = useHistory();
  const back = () => history.push('/');

  const [tableData, setTableData] = useState();
  const [loadingData, setLoadingData] = useState();

  const [open, setOpen] = useState();
  const [confirmDelete, setConfirmDelete] = useState();
  const [openInfo, setOpenInfo] = useState();
  const [info, setInfo] = useState();

  const [song, setSong] = useState(defaultSong)
  const [id, setId] = useState();
  const [loadingCrud, setLoadingCrud] = useState();

  useEffect(() => loadSongs(), [])

  const loadSongs = () => {
    setOpen(false);
    setLoadingData(true);
    loggedInstance.get('songs/')
      .then(response => {
        setTableData(response.data.result.sort((a, b) => a.artist < b.artist ? -1 : 1));
      })
      .catch(error => console.log(error))
      .finally(() => setLoadingData(false));
  }

  const add = () => {
    setOpen(true);
    setSong(defaultSong);
    setId('');
  }

  const onClose = () => setOpen(false);

  const update = (item) => {
    setOpen(true);
    setConfirmDelete(false);
    setId(item._id.$oid);
    setSong(item);
  }

  const onChangeArtist = (event) => setSong({ ...song, artist: event.target.value });
  const onChangeTitle = (event) => setSong({ ...song, title: event.target.value });
  const onChangeDifficulty = (e, { rating }) => setSong({ ...song, difficulty: rating });
  const onChangeAcoustic = (e, { checked }) => setSong({ ...song, acoustic: checked });
  const onChangeDfm = (e, { checked }) => setSong({ ...song, dfm: checked });
  const onChangeBacking = (e, { checked }) => setSong({ ...song, backing: checked });
  const onChangeTab = (e, { checked }) => setSong({ ...song, tab: checked });
  const onChangeNotes = (event) => setSong({ ...song, notes: event.target.value });

  const addUpdateSongs = () => {
    setLoadingCrud(true);
    if (id) {
      const { artist, title, difficulty, acoustic, dfm, backing, tab, notes } = song;
      loggedInstance.put('songs/' + id, { artist, title, difficulty, acoustic, dfm, backing, tab, notes })
        .then(response => loadSongs())
        .catch(error => console.log(error))
        .finally(() => setLoadingCrud(false));
    } else {
      loggedInstance.post('songs/', song)
        .then(response => loadSongs())
        .catch(error => console.log(error))
        .finally(() => setLoadingCrud(false));
    }
  }

  const onDelete = () => setConfirmDelete(true);

  const deleteSong = () => {
    setConfirmDelete(false);
    setLoadingCrud(true);
    loggedInstance.delete('songs/' + id)
      .then(response => loadSongs())
      .catch(error => console.log(error))
      .finally(() => setLoadingCrud(false));
  }

  const onOpenInfo = (info) => {
    setOpenInfo(true);
    setInfo(info);
  }

  const onCloseInfo = () => setOpenInfo(false);

  return (
    <>
      <Dimmer active={loadingData} inverted>
        <Loader>Loading...</Loader>
      </Dimmer>

      <SongsHeader back={back} add={add}></SongsHeader>

      <SongsTable tableData={tableData} update={update} onOpenInfo={onOpenInfo}></SongsTable>

      <Modal open={open}>
        <Modal.Header>{id ? 'Update Song' : 'Add Song'}</Modal.Header>
        <Modal.Content>
          <SongsCrud
            addUpdateSongs={addUpdateSongs}
            loadingCrud={loadingCrud}
            song={song}
            onChangeArtist={onChangeArtist}
            onChangeTitle={onChangeTitle}
            onChangeDifficulty={onChangeDifficulty}
            onChangeAcoustic={onChangeAcoustic}
            onChangeDfm={onChangeDfm}
            onChangeBacking={onChangeBacking}
            onChangeTab={onChangeTab}
            onChangeNotes={onChangeNotes}
            confirmDelete={confirmDelete}
            onDelete={onDelete}
            deleteSong={deleteSong}
            id={id}>
          </SongsCrud>
          <Button onClick={onClose} fluid>Close</Button>
        </Modal.Content>
      </Modal>

      <SongsInfo openInfo={openInfo} onCloseInfo={onCloseInfo} info={info}></SongsInfo>
    </>
  )
}

export default Songs;