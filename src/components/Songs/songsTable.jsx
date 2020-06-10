import React, { useState, useEffect } from 'react';
import { Table, Checkbox } from 'semantic-ui-react';

const SongsTable = (props) => {

  const [column, setColumn] = useState();
  const [direction, setDirection] = useState();
  const [tableDataFiltered, setTableDataFiltered] = useState();
  const [acousticFilter, setAcousticFilter] = useState();
  const [dfmFilter, setDfmFilter] = useState();

  useEffect(() => {
    setTableDataFiltered(props.tableData)
    setDirection('ascending');
    setColumn('artist');
  }, [props.tableData]);

  useEffect(() => {
    if (acousticFilter && dfmFilter) {
      setTableDataFiltered(props.tableData.filter(d => d.acoustic && d.dfm));
    } else if (acousticFilter) {
      setTableDataFiltered(props.tableData.filter(d => d.acoustic));
    } else if (dfmFilter) {
      setTableDataFiltered(props.tableData.filter(d => d.dfm));
    } else {
      setTableDataFiltered(props.tableData);
    }
  }, [acousticFilter, dfmFilter, props.tableData]);

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

  const onAcousticFilter = (e, { checked }) => setAcousticFilter(checked);
  const onDfmFilter = (e, { checked }) => setDfmFilter(checked);

  return (
    <>
      Filtra acoustic
      <Checkbox onChange={onAcousticFilter}></Checkbox>
      Filtra dfm
      <Checkbox onChange={onDfmFilter}></Checkbox>
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