import React from 'react';
import PropTypes from 'prop-types';
import CardTemplate from './CardTemplate';

const TILT = 'rotate(-7deg)';
const STYLES = {
  display: 'inline-block'
};

const MIN_DIMENSIONS = {
  x: 243,
  y: 40
};
const setDimension = (dimension, minDimension) => `${dimension || minDimension}px`;

const propTypes = {
  card: PropTypes.object
};

const CardDragPreview = (props) => {
  STYLES.width = setDimension(props.card.clientWidth, MIN_DIMENSIONS.x);
  STYLES.height = setDimension(props.card.clientHeight, MIN_DIMENSIONS.y);

  return (
    <div style={STYLES}>
      <CardTemplate item={props.card.item} />
    </div>
  );
};

CardDragPreview.propTypes = propTypes;

export default CardDragPreview;
