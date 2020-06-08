import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Header, Icon, Grid, Button, Table, Dimmer, Loader, Form, Modal, Rating, Divider } from 'semantic-ui-react';
import RatingNew from '../RatingNew/ratingNew';
import { loggedInstance } from '../../axiosConfig';

const Songs = () => {

  const history = useHistory();
  const back = () => history.push('/');

  const [tableData, setTableData] = useState();
  const [loadingData, setLoadingData] = useState();


  const [open, setOpen] = useState();
  const [confirmDelete, setConfirmDelete] = useState();

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

  const [column, setColumn] = useState();
  const [direction, setDirection] = useState();

  useEffect(() => loadSongs(), [])

  const loadSongs = () => {
    setOpen(false);
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

  const onClose = () => setOpen(false);

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
            <Button onClick={add} icon="plus" fluid color="olive" content="Add Song"></Button>
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
              <Table.Row key={i} onClick={() => update(song)}>
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
            <Form.Input label='Notes' name="notes" value={notes} placeholder='Notes' onChange={onChangeNotes} />
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
    </>
  )
}

export default Songs;