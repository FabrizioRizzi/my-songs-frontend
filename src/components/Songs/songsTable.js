
import React, { useState, useEffect } from 'react';
import SongsTableView from './songsTableView';

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
    <SongsTableView
      tableDataFiltered={tableDataFiltered}
      toggleAcousticFilter={toggleAcousticFilter}
      acousticFilter={acousticFilter}
      toggleDfmFilter={toggleDfmFilter}
      dfmFilter={dfmFilter}
      toggleDifficultFilter={toggleDifficultFilter}
      difficultFilter={difficultFilter}
      toggleEasyFilter={toggleEasyFilter}
      easyFilter={easyFilter}
      handleSort={handleSort}
      column={column}
      direction={direction}
      update={props.update}
      onOpenInfo={props.onOpenInfo}></SongsTableView>)
}

export default SongsTable;