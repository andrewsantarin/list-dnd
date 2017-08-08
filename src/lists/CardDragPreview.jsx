import React from 'react';
import PropTypes from 'prop-types';
import CardTemplate from './CardTemplate';

const TILT = 'rotate(-7deg)';
const STYLES = {
  display: 'inline-block',
  transform: TILT,
  WebkitTransform: TILT
};

const MIN_DIMENSIONS = 243;
const setDimension = (dimension) => `${dimension || MIN_DIMENSIONS}px`;

const propTypes = {
  card: PropTypes.object
};

const CardDragPreview = (props) => {
  styles.width = setDimension(props.card.clientWidth);
  styles.height = setDimension(props.card.clientHeight);

  return (
    <div style={styles}>
      <CardTemplate item={props.card.item} />
    </div>
  );
};

CardDragPreview.propTypes = propTypes;

export default CardDragPreview;
