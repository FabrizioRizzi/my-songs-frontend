import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Table, Rating, Modal, Header, Button, Loader, Icon, Dimmer, Form, Divider, Segment } from 'semantic-ui-react';
import { loggedInstance } from '../../axiosConfig';
import RatingNew from '../RatingNew/ratingNew';
import StandardsInfo from './standardsInfo';

const Standards = () => {

  const history = useHistory();
  const back = () => history.push('/');

  const [tableData, setTableData] = useState();
  const [loadingData, setLoadingData] = useState();

  const [open, setOpen] = useState();
  const [confirmDelete, setConfirmDelete] = useState();
  const [openInfo, setOpenInfo] = useState();
  const [info, setInfo] = useState();

  const [title, setTitle] = useState();
  const [aebersold, setAebersold] = useState();
  const [difficulty, setDifficulty] = useState();
  const [notes, setNotes] = useState();
  const [id, setId] = useState();
  const [loadingCrud, setLoadingCrud] = useState();

  const [column, setColumn] = useState();
  const [direction, setDirection] = useState();

  useEffect(() => loadStandards(), [])

  const loadStandards = () => {
    setOpen(false);
    setLoadingData(true);
    loggedInstance.get('standards/')
      .then(response => {
        setTableData(response.data.result.sort((a, b) => a.title < b.title ? -1 : 1));
        setDirection('ascending');
        setColumn('title');
      })
      .catch(error => console.log(error))
      .finally(() => setLoadingData(false));
  }

  const add = () => {
    setOpen(true);
    setTitle('');
    setAebersold('');
    setDifficulty("0");
    setNotes('');
    setId('');
  }

  const update = (item) => {
    setOpen(true);
    setConfirmDelete(false);
    setTitle(item.title);
    setAebersold(item.aebersold);
    setDifficulty(item.difficulty);
    setNotes(item.notes);
    setId(item._id.$oid);
  }

  const onClose = () => setOpen(false);

  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeAebersold = (event) => setAebersold(event.target.value);
  const onChangeDifficulty = (e, { rating }) => setDifficulty(rating);
  const onChangeNotes = (event) => setNotes(event.target.value);

  const addUpdateStandards = () => {
    setLoadingCrud(true);
    if (id) {
      loggedInstance.put('standards/' + id, { title, aebersold, difficulty, notes })
        .then(response => loadStandards())
        .catch(error => console.log(error))
        .finally(() => setLoadingCrud(false));
    } else {
      loggedInstance.post('standards/', { title, aebersold, difficulty, notes })
        .then(response => loadStandards())
        .catch(error => console.log(error))
        .finally(() => setLoadingCrud(false));
    }
  }

  const onDelete = () => setConfirmDelete(true);

  const deleteStandard = () => {
    setConfirmDelete(false);
    setLoadingCrud(true);
    loggedInstance.delete('standards/' + id)
      .then(response => loadStandards())
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

      <Segment padded basic>
        <Header as='h2' icon textAlign='center' color="brown" >
          <Icon name='microphone' circular inverted color='brown' />
          <Header.Content>Standards</Header.Content>
          <Header.Subheader>Jazz da suonare</Header.Subheader>
        </Header>

        <Grid columns={2} >
          <Grid.Column>
            <Button onClick={back} icon="arrow left" fluid content="Back Home"></Button>
          </Grid.Column>
          <Grid.Column>
            <Button onClick={add} icon="plus" fluid color="brown" content="Add Standard"></Button>
          </Grid.Column>
        </Grid>
      </Segment>

      <Table sortable textAlign="center" color="brown" unstackable size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'title' ? direction : null}
              onClick={handleSort('title')}>Title</Table.HeaderCell>
            <Table.HeaderCell>Aebersold</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'difficulty' ? direction : null}
              onClick={handleSort('difficulty')}>Difficulty</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableData?.map((standard) => {
            return (
              <Table.Row key={standard._id.$oid}>
                <Table.Cell>{standard.title}</Table.Cell>
                <Table.Cell>{standard.aebersold}</Table.Cell>
                <Table.Cell singleLine>
                  <RatingNew rating={standard.difficulty} color="brown"></RatingNew>
                </Table.Cell>
                <Table.Cell icon="edit" onClick={() => update(standard)} style={{ cursor: 'pointer', color: "brown" }}></Table.Cell>
                <Table.Cell icon="info circle" onClick={() => onOpenInfo(standard)} style={{ cursor: 'pointer', color: "brown" }}></Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>

      <Modal open={open}>
        <Modal.Header>{id ? 'Update Standard' : 'Add Standard'}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={addUpdateStandards} loading={loadingCrud}>
            <Form.Input label='Title' name="title" value={title} placeholder='Title' onChange={onChangeTitle} required />
            <Form.Input label='Aebersold' name="aebersold" value={aebersold} placeholder='Aebersold' onChange={onChangeAebersold} />
            <Form.Field>
              <label>Difficulty</label>
              <Rating icon="star" size="huge" color="brown" defaultRating={difficulty} maxRating={5} onRate={onChangeDifficulty} clearable></Rating>
            </Form.Field>
            <Form.TextArea label='Notes' name="notes" value={notes} placeholder='Notes' onChange={onChangeNotes} />
            <Divider horizontal style={{ margin: '25px' }}>Confirm</Divider>
            {id ?
              (<Button.Group fluid>
                <Button type="submit" positive>Update</Button>
                <Button.Or text='O' />
                {!confirmDelete ? (<Button onClick={onDelete} negative>Delete</Button>) : ''}
                {confirmDelete ? (<Button onClick={deleteStandard} negative>Confirm Delete?</Button>) : ''}
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
          <StandardsInfo info={info}></StandardsInfo>
          <Button onClick={onCloseInfo} fluid>Close</Button>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default Standards;