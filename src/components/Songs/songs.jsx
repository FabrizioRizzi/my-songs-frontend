import React, { useState, useEffect } from 'react';
import { Button, Dimmer, Loader, Form, Modal, Rating, Divider } from 'semantic-ui-react';
import { loggedInstance } from '../../axiosConfig';
import SongsInfo from './songsInfo';
import SongsHeader from './songsHeader';
import SongsTable from './songsTable';

const Songs = () => {

  const [tableData, setTableData] = useState();
  const [loadingData, setLoadingData] = useState();

  const [open, setOpen] = useState();
  const [confirmDelete, setConfirmDelete] = useState();
  const [openInfo, setOpenInfo] = useState();
  const [info, setInfo] = useState();

  const [artist, setArtist] = useState();
  const [title, setTitle] = useState();
  const [difficulty, setDifficulty] = useState();
  const [acoustic, setAcoustic] = useState();
  const [dfm, setDfm] = useState();
  const [backing, setBacking] = useState();
  const [tab, setTab] = useState();
  const [notes, setNotes] = useState();
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
    setArtist('');
    setTitle('');
    setDifficulty("0");
    setAcoustic(false);
    setDfm(false);
    setBacking(false);
    setTab(false);
    setNotes('');
    setId('');
  }

  const onClose = () => setOpen(false);

  const update = (item) => {
    setOpen(true);
    setConfirmDelete(false);
    setArtist(item.artist);
    setTitle(item.title);
    setDifficulty(item.difficulty);
    setAcoustic(item.acoustic);
    setDfm(item.dfm);
    setBacking(item.backing);
    setTab(item.tab);
    setNotes(item.notes);
    setId(item._id.$oid);
  }

  const onChangeArtist = (event) => setArtist(event.target.value);
  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeDifficulty = (e, { rating }) => setDifficulty(rating);
  const onChangeAcoustic = (e, { checked }) => setAcoustic(checked);
  const onChangeDfm = (e, { checked }) => setDfm(checked);
  const onChangeBacking = (e, { checked }) => setBacking(checked);
  const onChangeTab = (e, { checked }) => setTab(checked);
  const onChangeNotes = (event) => setNotes(event.target.value);

  const addUpdateSongs = () => {
    setLoadingCrud(true);
    if (id) {
      loggedInstance.put('songs/' + id, { artist, title, difficulty, acoustic, dfm, backing, tab, notes })
        .then(response => loadSongs())
        .catch(error => console.log(error))
        .finally(() => setLoadingCrud(false));
    } else {
      loggedInstance.post('songs/', { artist, title, difficulty, acoustic, dfm, backing, tab, notes })
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

      <SongsHeader add={add}></SongsHeader>

      <SongsTable tableData={tableData} update={update} onOpenInfo={onOpenInfo}></SongsTable>

      <Modal open={open}>
        <Modal.Header>{id ? 'Update Song' : 'Add Song'}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={addUpdateSongs} loading={loadingCrud}>
            <Form.Input label='Artist' name="artist" value={artist} placeholder='Artist' onChange={onChangeArtist} required />
            <Form.Input label='Title' name="title" value={title} placeholder='Title' onChange={onChangeTitle} required />
            <Form.Field>
              <label>Difficulty</label>
              <Rating icon="star" size="huge" color="olive" defaultRating={difficulty} maxRating={5} onRate={onChangeDifficulty} clearable></Rating>
            </Form.Field>
            <Form.Checkbox label='Acoustic' checked={acoustic} onChange={onChangeAcoustic}></Form.Checkbox>
            <Form.Checkbox label='Dont Forget Me!' checked={dfm} onChange={onChangeDfm}></Form.Checkbox>
            <Form.Checkbox label='Backing Track' checked={backing} onChange={onChangeBacking}></Form.Checkbox>
            <Form.Checkbox label='Tab' checked={tab} onChange={onChangeTab}></Form.Checkbox>
            <Form.TextArea label='Notes' name="notes" value={notes} placeholder='Notes' onChange={onChangeNotes} />
            <Divider horizontal style={{ margin: '25px' }}>Confirm</Divider>
            {id ?
              (<Button.Group fluid>
                <Button type="submit" positive>Update</Button>
                <Button.Or text='O' />
                {!confirmDelete ? (<Button onClick={onDelete} negative>Delete</Button>) : ''}
                {confirmDelete ? (<Button onClick={deleteSong} negative>Confirm Delete?</Button>) : ''}
              </Button.Group>) :
              (<Button type="submit" fluid positive>{id ? 'Update' : 'Add'}</Button>)}
          </Form>
          <Divider horizontal style={{ margin: '25px' }}>Close</Divider>
          <Button onClick={onClose} fluid>Close</Button>
        </Modal.Content>
      </Modal>

      <Modal open={openInfo}>
        <Modal.Header>Song Info</Modal.Header>
        <Modal.Content>
          <SongsInfo info={info}></SongsInfo>
          <Button onClick={onCloseInfo} fluid>Close</Button>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default Songs;