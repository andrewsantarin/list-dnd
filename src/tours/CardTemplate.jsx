import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object
};

const CardTemplate = (props) => {
  const { style, item } = props;
  const id = style ? item.id : null;

  return (
    <div style={style} id={id} className="item">
      <div className="item-name">{item.title}</div>
      <div className="item-content">
        <div className="item-author">{`${item.firstName} ${item.lastName}`}</div>
        <p>Content!</p>
      </div>
    </div>
  );
}

CardTemplate.propTypes = propTypes;

export default CardTemplate;
