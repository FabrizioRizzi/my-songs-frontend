import React from 'react';
import { List, Label } from 'semantic-ui-react';
import RatingNew from '../RatingNew/ratingNew';

const SongsInfo = (props) => {
  return (
    <>
      <List>
        <List.Item>
          <List.Content>
            <List.Header>Artist</List.Header>
            {props.info?.artist}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Title</List.Header>
            {props.info?.title}
          </List.Content>
        </List.Item>
      </List>
      <List>
        <List.Item>
          <List.Content>
            <List.Header>Difficulty</List.Header>
            <RatingNew rating={props.info?.difficulty} color="olive"></RatingNew>
          </List.Content>
        </List.Item>
        {props.info?.acoustic ? (
          <List.Item>
            <List.Content>
              <List.Header>
                <Label color="olive">Acoustic</Label>
              </List.Header>
            </List.Content>
          </List.Item>) : ''}
        {props.info?.dfm ? (
          <List.Item>
            <List.Content>
              <List.Header>
                <Label color="olive">Don't forget me!</Label>
              </List.Header>
            </List.Content>
          </List.Item>) : ''}
        {props.info?.backing ? (
          <List.Item>
            <List.Content>
              <List.Header>
                <Label color="olive">Backing Track</Label>
              </List.Header>
            </List.Content>
          </List.Item>) : ''}
        {props.info?.tab ? (
          <List.Item>
            <List.Content>
              <List.Header>
                <Label color="olive">Tab</Label>
              </List.Header>
            </List.Content>
          </List.Item>) : ''}
        {props.info?.notes ? (
          <List.Item>
            <List.Content>
              <List.Header>Notes</List.Header>
              {props.info?.notes}
            </List.Content>
          </List.Item>) : ''}
      </List>
    </>
  )
}

export default SongsInfo;