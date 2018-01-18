import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import flow from 'lodash/flow';

import dragTypes from '../constants/dragTypes';
import dropSoundSort from '../actions/dropSoundSort';
import moveSound from '../actions/moveSound';
import recordIndices from '../actions/recordIndices';
import SoundDropButtonContainer from '../components/SoundDropButtonContainer';

const soundTarget = {};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class SoundDrop extends Component {
  render() {
    const {
      connectDropTarget,
      dropSoundSort,
      droppedSounds,
      isOver,
      moveSound,
      recordIndices,
    } = this.props;

    return connectDropTarget(
      <div
        className='dropContainer'
        style={{
          boxShadow: isOver ? 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px' : ''
        }}
      >
        {droppedSounds.length > 0 ? droppedSounds.map((el, i) => {
          const gradient = i / droppedSounds.length;
          return (
            <SoundDropButtonContainer
              key={i}
              dropSoundSort={dropSoundSort}
              filename={el.filename}
              gradient={gradient}
              index={i}
              moveSound={moveSound}
              recordIndices={recordIndices}
            />
          )
        }) : 'Drop sounds here!'}
      </div>
    );
  }
}

SoundDrop.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  dropSoundSort: PropTypes.func,
  droppedSounds: PropTypes.arrayOf(PropTypes.object),
  moveSound: PropTypes.func,
  recordIndices: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { droppedSounds } = state;
  return {
    droppedSounds
  };
};

const mapDispatchToProps = {
  dropSoundSort,
  moveSound,
  recordIndices,
};

export default flow(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(dragTypes.SOUND, soundTarget, collect),
)(SoundDrop);
