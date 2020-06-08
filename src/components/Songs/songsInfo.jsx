import React from 'react';
import { Grid, Checkbox } from 'semantic-ui-react';

const SongsInfo = (props) => {
  return (
    <>
      <div>{props.info?.artist}</div>
      <div>{props.info?.title}</div>
      <div>{props.info?.difficulty}</div>
      <Grid columns={3}>
        <Grid.Column><Checkbox checked={props.info?.acoustic}></Checkbox></Grid.Column>
        <Grid.Column><Checkbox checked={props.info?.dfm}></Checkbox></Grid.Column>
        <Grid.Column><Checkbox checked={props.info?.backing}></Checkbox></Grid.Column>
      </Grid>
    </>
  )
}

export default SongsInfo;