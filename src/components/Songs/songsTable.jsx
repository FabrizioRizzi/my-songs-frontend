import React, { useState, useEffect } from 'react';
import { Table, Grid, Checkbox, Label } from 'semantic-ui-react';

const SongsTable = (props) => {

  const [column, setColumn] = useState();
  const [direction, setDirection] = useState();
  const [tableDataFiltered, setTableDataFiltered] = useState();
  const [acousticFilter, setAcousticFilter] = useState();
  const [dfmFilter, setDfmFilter] = useState();
  const [difficultFilter, setDifficultFilter] = useState();
  const [easyFilter, setEasyFilter] = useState();

  useEffect(() => {
    setTableDataFiltered(props.tableData)
    setDirection('ascending');
    setColumn('artist');
  }, [props.tableData]);

  useEffect(() => {
    let dataFiltered = props.tableData;
    if (acousticFilter) {
      dataFiltered = dataFiltered.filter(d => d.acoustic);
    }
    if (dfmFilter) {
      dataFiltered = dataFiltered.filter(d => d.dfm);
    }
    if (difficultFilter) {
      dataFiltered = dataFiltered.filter(d => d.difficulty > 3);
    }
    if (easyFilter) {
      dataFiltered = dataFiltered.filter(d => d.difficulty <= 3);
    }
    setTableDataFiltered(dataFiltered);
  }, [acousticFilter, dfmFilter, difficultFilter, easyFilter, props.tableData]);

  const handleSort = (clickedColumn) => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setTableDataFiltered(tableDataFiltered.sort((a, b) => a[clickedColumn] < b[clickedColumn] ? -1 : 1));
      setDirection('ascending');
    } else {
      setTableDataFiltered(tableDataFiltered.reverse());
      setDirection(direction === 'ascending' ? 'descending' : 'ascending')
    }
  }

  const toggleAcousticFilter = () => setAcousticFilter(!acousticFilter);
  const toggleDfmFilter = () => setDfmFilter(!dfmFilter);
  const toggleDifficultFilter = () => setDifficultFilter(!difficultFilter);
  const toggleEasyFilter = () => setEasyFilter(!easyFilter);

  return (
    <>
      <Grid columns={4} divided>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Label as='a' onClick={toggleAcousticFilter} color={acousticFilter ? 'olive' : null}>Acoustic</Label>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Label as='a' onClick={toggleDfmFilter} color={dfmFilter ? 'olive' : null}>DFM</Label>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Label as='a' onClick={toggleDifficultFilter} color={difficultFilter ? 'olive' : null}>Difficult</Label>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Label as='a' onClick={toggleEasyFilter} color={easyFilter ? 'olive' : null}>Easy</Label>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table sortable textAlign="center" color="olive" unstackable size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'artist' ? direction : null}
              onClick={handleSort('artist')}>Artist</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'title' ? direction : null}
              onClick={handleSort('title')}>Title</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'acoustic' ? direction : null}
              onClick={handleSort('acoustic')}>Acoustic</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'dfm' ? direction : null}
              onClick={handleSort('dfm')}>DFM</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableDataFiltered?.map((song) => {
            return (
              <Table.Row key={song._id.$oid}>
                <Table.Cell>{song.artist}</Table.Cell>
                <Table.Cell>{song.title}</Table.Cell>
                <Table.Cell>
                  <Checkbox checked={song.acoustic} disabled></Checkbox>
                </Table.Cell>
                <Table.Cell>
                  <Checkbox checked={song.dfm} disabled></Checkbox>
                </Table.Cell>
                <Table.Cell icon="edit" onClick={() => props.update(song)} style={{ cursor: 'pointer', color: "olive" }}></Table.Cell>
                <Table.Cell icon="info circle" onClick={() => props.onOpenInfo(song)} style={{ cursor: 'pointer', color: "olive" }}></Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default SongsTable;