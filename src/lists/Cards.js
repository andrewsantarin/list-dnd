import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import itemTypes from './itemTypes';
import Card from './Card';

const CARD_HEIGHT = 18;  // height of a single card(excluding marginBottom/paddingBottom)
const CARD_MARGIN = 23;  // height of a marginBottom+paddingBottom
const OFFSET_HEIGHT = 40; // height offset from the top of the page

// Won't work. See TODO below.
function getPlaceholderIndex(y, scrollY) {
  // shift placeholder if y position more than card height / 2
  const yPos = y - OFFSET_HEIGHT + scrollY;
  let placeholderIndex;
  if (yPos < CARD_HEIGHT / 2) {
    placeholderIndex = -1; // place at the start
  } else {
    placeholderIndex = Math.floor((yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN));
  }
  console.log(placeholderIndex);
  return placeholderIndex;
}

const cardTarget = {
  drop(props, monitor, component) {
    document.getElementById(monitor.getItem().id).style.display = 'block';
    const { placeholderIndex } = component.state;
    const lastX = monitor.getItem().x;
    const lastY = monitor.getItem().y;
    const nextX = props.x;
    let nextY = placeholderIndex;

    if (lastY > nextY) { // move top
      nextY += 1;
    } else if (lastX !== nextX) { // insert into another list
      nextY += 1;
    }

    if (lastX === nextX && lastY === nextY) { // if position is equal
      return;
    }

    props.moveCard(lastX, lastY, nextX, nextY);
  },
  hover(props, monitor, component) {
    console.log(monitor.getItem());
    /**
     * NO, NO, NO!
     * For this use case, this algorithm won't work!
     * It assumes that the card is belongs to a list column that fills the entire vertical space of the screen.
     * Which isn't true here. Here, a "list" only takes up part of that vertical space, so the vertical space can have multiple lists.
     *
     * TODO
     * Change this bloody formula!
     */
    // defines where placeholder is rendered
    const placeholderIndex = getPlaceholderIndex(
      monitor.getClientOffset().y,
      findDOMNode(component).scrollTop
    );

    /*
    // horizontal scroll
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling('toRight');
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling('toLeft');
      }
    } else {
      if (window.innerWidth - monitor.getClientOffset().x > 200 &&
          monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }
    */

    // IMPORTANT!
    // HACK! Since there is an open bug in react-dnd, making it impossible
    // to get the current client offset through the collect function as the
    // user moves the mouse, we do this awful hack and set the state (!!)
    // on the component from here outside the component.
    // https://github.com/gaearon/react-dnd/issues/179
    component.setState({ placeholderIndex });

    // when drag begins, we hide the card and only display cardDragPreview
    const item = monitor.getItem();
    document.getElementById(item.id).style.display = 'none';
  }
};

const collector = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem()
});

const PlaceholderCard = () => <div key="placeholder" className="item placeholder" style={{ height: '1em', padding: '12px 17px', backgroundColor: '#aaa' }} />;

@DropTarget(itemTypes.CARD, cardTarget, collector)
export default class extends Component {
  static propTypes = {
    dropTarget: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    x: PropTypes.number.isRequired,
    isOver: PropTypes.bool,
    item: PropTypes.object,
    canDrop: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      placeholderIndex: undefined,
      isScrolling: false,
    };
  }

  render() {
    const { dropTarget, x, cards, isOver, canDrop, stopScrolling } = this.props;
    const { placeholderIndex } = this.state;

    let isPlaceholder = false;
    let cardsList = [];

    cards.forEach((item, i) => {
      if (isOver && canDrop) {
        isPlaceholder = false;
        if (i === 0 && placeholderIndex === -1) {
          cardsList.push(<PlaceholderCard />);
        } else if (placeholderIndex > i) {
          isPlaceholder = true;
        }
      }
      if (item !== undefined) {
        cardsList.push(
          <Card x={x} y={i}
            item={item}
            key={item.id}
            stopScrolling={stopScrolling}
          />
        );
      }
      if (isOver && canDrop && placeholderIndex === i) {
        cardsList.push(<PlaceholderCard />);
      }
    });

    // if placeholder index is greater than array.length, display placeholder as last
    // if there is no items in cards currently, display a placeholder anyway
    if (isPlaceholder || (isOver && canDrop && cards.length === 0)) {
      cardsList.push(<PlaceholderCard />);
    }

    return dropTarget(
      <div className="list-items" style={{ padding: '15px' }}>
        {cardsList}
      </div>
    );
  }
}
