import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import playSounds from '../actions/playSounds';

class PlaySounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  render() {
    const r = 147;
    const g = 249;
    const b = 185;
    const { droppedSounds } = this.props;
    const soundsToPlay = droppedSounds.length > 0;

    return (
      <div
        onClick={() => soundsToPlay ? this.props.playSounds() : '' }
        onMouseEnter={() => { this.setState({ hover: true })}}
        onMouseLeave={() => { this.setState({ hover: false })}}
        style={{
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
          boxShadow: this.state.hover && soundsToPlay ? 'rgba(0, 0, 0, 0.32) 0px 3px 10px, rgba(0, 0, 0, 0.46) 0px 3px 10px' : '',
          color: 'white',
          margin: '5px'
        }}
        className='soundButton'
      >
        >
      </div>
    );
  }
}

PlaySounds.propTypes = {
  droppedSounds: PropTypes.arrayOf(PropTypes.object),
  playSounds: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { droppedSounds } = state;
  return {
    droppedSounds, 
  };
};

const mapDispatchToProps = {
  playSounds,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaySounds);
