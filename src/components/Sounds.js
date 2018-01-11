import React, { Component } from 'react';
import { connect } from 'react-redux';

import Sound from './Sound';
import dropSound from '../actions/dropSound';
import fetchSound from '../actions/fetchSound';
import SoundButton from './SoundButton';
import sounds from '../constants/sounds.js';

class Sounds extends Component {
  render() {
    return (
      <div className='sounds'>
        {sounds.map((el, i) => (
          <Sound
            key={i}
            index={i}
            filename={el}
            dropSound={this.props.dropSound}
            fetchSound={this.props.fetchSound}
          >
            <SoundButton
              key={i}
              index={i}
              filename={el}
              gradient={i / sounds.length}
            />
          </Sound>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  dropSound,
  fetchSound,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sounds);
