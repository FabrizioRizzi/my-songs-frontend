import React from 'react';
import { Star } from 'grommet-icons';

export const Rating = (props) => {
  return (
    [1, 2, 3, 4, 5].map(i => <Star key={i} size="small" color={props.value >= i ? 'brand' : 'light-4'}></Star>)
  );
}
