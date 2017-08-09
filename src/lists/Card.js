import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import itemTypes from './itemTypes';
import CardTemplate from './CardTemplate';

const cardSource = {
  beginDrag(props, monitor, component) {
    const { item, x, y } = props;
    const { id, title } = item;
    const { clientWidth, clientHeight } = findDOMNode(component);

    return { id, title, item, x, y, clientWidth, clientHeight };
  },

  endDrag(props, monitor) {
    document.getElementById(monitor.getItem().id).style.display = 'block';
    // props.stopScrolling();
  },

  isDragging(props, monitor) {
    const isDragging = props.item && props.item.id === monitor.getItem().id;
    return isDragging;
  },
};

const cardSourceCollector = (connect, monitor) => ({
  dragSource: connect.dragSource(),
  dragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

// options: 4rd param to DragSource https://react-dnd.github.io/react-dnd/docs-drag-source.html
const cardSourceOptions = {
  arePropsEqual(props, otherProps) {
    // performance stuff.
    return true
      && props.item.id === otherProps.item.id
      && props.x === otherProps.x
      && props.y === otherProps.y;
  }
};

@DragSource(itemTypes.CARD, cardSource, cardSourceCollector, cardSourceOptions)
export default class Card extends Component {
  static propTypes = {
    item: PropTypes.object,
    dragSource: PropTypes.func.isRequired,
    dragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number,
    stopScrolling: PropTypes.func
  }

  componentDidMount() {
    this.props.dragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }

  render() {
    const { isDragging, dragSource, item } = this.props;

    return dragSource(
      <div>
        <CardTemplate item={item} style={{ border: '1px solid', padding: '10px 15px', backgroundColor: '#eee' }} />
      </div>
    );
  }
}
