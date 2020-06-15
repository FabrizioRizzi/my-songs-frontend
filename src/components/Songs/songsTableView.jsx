import React from 'react';
import { Table, Grid, Label, Icon } from 'semantic-ui-react';

const SongsTableView = (props) => {
  return (
    <>
      <Grid columns={4} divided padded>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Label as='a' onClick={props.toggleAcousticFilter} color={props.acousticFilter ? 'olive' : null}>Acoustic</Label>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Label as='a' onClick={props.toggleDfmFilter} color={props.dfmFilter ? 'olive' : null}>DFM</Label>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Label as='a' onClick={props.toggleDifficultFilter} color={props.difficultFilter ? 'olive' : null}>Difficult</Label>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Label as='a' onClick={props.toggleEasyFilter} color={props.easyFilter ? 'olive' : null}>Easy</Label>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table sortable textAlign="center" color="olive" unstackable size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={props.column === 'artist' ? props.direction : null}
              onClick={props.handleSort('artist')}>Artist</Table.HeaderCell>
            <Table.HeaderCell
              sorted={props.column === 'title' ? props.direction : null}
              onClick={props.handleSort('title')}>Title</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.tableDataFiltered?.map((song) => {
            return (
              <Table.Row key={song._id.$oid}>
                <Table.Cell>{song.artist}</Table.Cell>
                <Table.Cell>{song.title}</Table.Cell>
                <Table.Cell onClick={() => props.update(song)} style={{ cursor: 'pointer', color: "olive" }}>
                  <Icon name="edit" size="big"></Icon>
                </Table.Cell>
                <Table.Cell onClick={() => props.onOpenInfo(song)} style={{ cursor: 'pointer', color: "olive" }}>
                  <Icon name="info circle" size="big"></Icon>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default SongsTableView;