import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DragDropContext from '../app/DragDropContext';

import * as listsActions from './actions';

import List from './List';
import CustomDragLayer from './CustomDragLayer';

const mapStateToProps = (state, props) => ({
  lists: state.lists.lists
});

const mapDispatchToProps = listsActions;

@connect(mapStateToProps, mapDispatchToProps)
@DragDropContext
export default class Lists extends Component {
  static propTypes = {
    getLists: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
  }

  componentWillMount() {
    this.props.getLists(10);
  }

  moveCard = (lastX, lastY, nextX, nextY) =>
    this.props.moveCard(lastX, lastY, nextX, nextY)

  render() {
    const { lists } = this.props;

    return (
      <div style={{ height: '100%', width: '50%' }}>
        <CustomDragLayer />
        {lists.map((list, i) =>
          <List
            key={list.id}
            id={list.id}
            list={list}
            moveCard={this.moveCard}
            x={i}
          />
        )}
      </div>
    );
  }
}
