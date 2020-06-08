import React from 'react';
import { Icon } from 'semantic-ui-react';

const RatingNew = (props) => {
  return (
    [1, 2, 3, 4, 5].map(i => <Icon name="star" key={i} style={{ color: i <= props.rating ? props.color : '#ddd' }} size="small"></Icon>)
  )
}

export default RatingNew;