import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
}

const soundTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Time to actually perform the action
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
