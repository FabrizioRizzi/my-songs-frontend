import React from 'react';
import { List } from 'semantic-ui-react';
import RatingNew from '../RatingNew/ratingNew';

const SongsInfo = (props) => {
  return (
    <>
      <List>
        <List.Item>
          <List.Content>
            <List.Header>Title</List.Header>
            {props.info?.title}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Aebersold</List.Header>
            {props.info?.aebersold}
          </List.Content>
        </List.Item>
      </List>
      <List>
        <List.Item>
          <List.Content>
            <List.Header>Difficulty</List.Header>
            <RatingNew rating={props.info?.difficulty} color="brown"></RatingNew>
          </List.Content>
        </List.Item>
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