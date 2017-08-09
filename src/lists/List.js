import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import Cards from './Cards';

export default class List extends Component {
  static propTypes = {
    item: PropTypes.object,
    x: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
  }

  render() {
    const { list, x, moveCard } = this.props;

    return (
      <div className="list" style={{ margin: '15px 0' }}>
        <div className="list-header">
          <div className="list-name">{list.name}</div>
        </div>
        <Cards
          moveCard={moveCard}
          cards={list.cards}
          x={x}
        />
      </div>
    );
  }
}
