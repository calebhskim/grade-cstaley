import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd'

import flow from 'lodash/flow';

import dragTypes from '../constants/dragTypes';
import SoundDropButton from './SoundDropButton';

const soundSource = {
	beginDrag(props) {
		return {
			filename: props.filename,
			index: props.index,
		}
	},
  endDrag(props, monitor, component) {
    props.dropSoundSort();
  },
}

const soundTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

    // Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    
		// Determine mouse position
		const clientOffset = monitor.getClientOffset();
    
    // Determine internal hover bouding box for performing move
		const horizontalPad = (hoverBoundingRect.right - hoverBoundingRect.left) / 6;
		const verticalPad = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 6;

		// Only perform the move when the cursor has crossed into a smaller area within the box
    if (clientOffset.x > hoverBoundingRect.right - horizontalPad ||
      clientOffset.x < hoverBoundingRect.left + horizontalPad ||
      clientOffset.y < hoverBoundingRect.top + verticalPad ||
      clientOffset.y > hoverBoundingRect.bottom - verticalPad) {
      return;
    }
    
    props.recordIndices(dragIndex, hoverIndex);
		props.moveSound(dragIndex, hoverIndex);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
	},
}

class SoundDropButtonContainer extends Component {
  render() {
    const {
			connectDragSource,
			connectDropTarget,
      filename,
      gradient,
      index,
      isOver,
    } = this.props;
    
    // Removes button from list while dragging
    const opacity = isOver ? 0 : 1;

    return connectDragSource(
      connectDropTarget(
        <div
          className='soundDropButtonContainer'
          style={{
            opacity
          }}
        >
          <SoundDropButton
            gradient={gradient}
            filename={filename}
            index={index}
          /> 
        </div>
      )
    );
  }
}

SoundDropButtonContainer.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
  dropSoundSort: PropTypes.func,
  filename: PropTypes.string,
  gradient: PropTypes.number,
  index: PropTypes.number,
  moveSound: PropTypes.func,
};


export default flow(
  DropTarget(dragTypes.DROPPED_SOUND, soundTarget, (connect, monitor) => ({
	  connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })),
  DragSource(dragTypes.DROPPED_SOUND, soundSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
  })),
)(SoundDropButtonContainer);
