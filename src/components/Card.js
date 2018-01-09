import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

import dragTypes from '../constants/dragTypes';

const cardSource = {
  beginDrag(props) {
    return {
      filename: props.filename,
      index: props.index,
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();
    props.fetchSound(item.filename).then(() => {
      props.dropSound({
        ...item,
      })
    });
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

// Wrap Button with Drag logic
class Card extends Component {
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div>
        {this.props.children}
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  dropSound: PropTypes.func,
  fetchSound: PropTypes.func,
};


export default DragSource(dragTypes.SOUND, cardSource, collect)(Card);
