import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import flow from 'lodash/flow';

import dragTypes from '../constants/dragTypes';
import SoundDropButton from '../components/SoundDropButton';

const soundTarget = {};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class SoundDrop extends Component {
  render() {
    const { connectDropTarget, droppedSounds, isOver } = this.props;

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
            <SoundDropButton
              key={i}
              gradient={gradient}
              filename={el.filename}
              index={i}
            />
          )
        }) : 'Drop sounds here!'}
      </div>
    );
  }
}

SoundDrop.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  droppedSounds: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  const { droppedSounds } = state;
  return {
    droppedSounds
  };
};

const mapDispatchToProps = {};

export default flow(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(dragTypes.SOUND, soundTarget, collect),
)(SoundDrop);
