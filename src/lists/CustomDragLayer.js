import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';

import itemTypes from './itemTypes';
import CardDragPreview from './CardDragPreview';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100000
};

const getItemStyles = (props) => {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    WebkitTransform: transform,
    transform
  };
}

const dragLayerCollector = (monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
});

@DragLayer(dragLayerCollector)
export default class CustomDragLayer extends Component {
  renderItem(itemType, item) {
    switch (itemType) {
      case itemTypes.CARD:
        return (
          <CardDragPreview card={item} style={{ border: '1px solid' }} />
        );
      case itemTypes.LIST:
      default:
        return null
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}
