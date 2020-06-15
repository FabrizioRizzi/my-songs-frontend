import React from 'react';
import { Form, Button, Rating, Divider } from 'semantic-ui-react';

const SongsCrud = (props) => {
  return (
    <>
      <Form onSubmit={props.addUpdateSongs} loading={props.loadingCrud}>
        <Form.Input label='Artist' name="artist" value={props.song.artist} placeholder='Artist' onChange={props.onChangeArtist} required />
        <Form.Input label='Title' name="title" value={props.song.title} placeholder='Title' onChange={props.onChangeTitle} required />
        <Form.Field>
          <label>Difficulty</label>
          <Rating icon="star" size="huge" color="olive" defaultRating={props.song.difficulty} maxRating={5} onRate={props.onChangeDifficulty} clearable></Rating>
        </Form.Field>
        <Form.Checkbox label='Acoustic' checked={props.song.acoustic} onChange={props.onChangeAcoustic}></Form.Checkbox>
        <Form.Checkbox label='Dont Forget Me!' checked={props.song.dfm} onChange={props.onChangeDfm}></Form.Checkbox>
        <Form.Checkbox label='Backing Track' checked={props.song.backing} onChange={props.onChangeBacking}></Form.Checkbox>
        <Form.Checkbox label='Tab' checked={props.song.tab} onChange={props.onChangeTab}></Form.Checkbox>
        <Form.TextArea label='Notes' name="notes" value={props.song.notes} placeholder='Notes' onChange={props.onChangeNotes} />
        <Divider horizontal style={{ margin: '25px' }}>Confirm</Divider>
        {props.id ?
          (<Button.Group fluid>
            <Button type="submit" positive>Update</Button>
            <Button.Or text='O' />
            {!props.confirmDelete ? (<Button onClick={props.onDelete} negative>Delete</Button>) : ''}
            {props.confirmDelete ? (<Button onClick={props.deleteSong} negative>Confirm Delete?</Button>) : ''}
          </Button.Group>) :
          (<Button type="submit" fluid positive>{props.id ? 'Update' : 'Add'}</Button>)}
      </Form>
      <Divider horizontal style={{ margin: '25px' }}>Close</Divider>
    </>
  )
}

export default SongsCrud;