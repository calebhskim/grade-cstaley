import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fetchSound from '../actions/fetchSound';
import play from '../actions/play';
import rgb from '../utils/rgb';

const left = {
  r: 252,
  g: 70,
  b: 107,
};

const right = {
  r: 63,
  g: 94,
  b: 251,
};

class SoundButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  clickHandler() {
    this.props.fetchSound(this.props.filename).then(() => {
      this.props.play(this.props.filename); 
    });
  }

  render() {
    const {
      filename,
      gradient
    } = this.props;
    
    const r = rgb.r(left, right, gradient);
    const g = rgb.g(left, right, gradient);
    const b = rgb.b(left, right, gradient);

    return (
      <div
        onClick={this.clickHandler}
        onMouseEnter={() => { this.setState({ hover: true })}}
        onMouseLeave={() => { this.setState({ hover: false })}}
        style={{
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
          boxShadow: this.state.hover ? 'rgba(0, 0, 0, 0.32) 0px 3px 10px, rgba(0, 0, 0, 0.46) 0px 3px 10px' : '',
          color: 'white',
          margin: '5px'
        }}
        className='soundButton'
      >
        {filename.replace(new RegExp('_', 'g'), ' ')}
      </div>
    );
  }
}

SoundButton.propTypes = {
  fetchSound: PropTypes.func,
  filename: PropTypes.string,
  gradient: PropTypes.number,
  play: PropTypes.func,
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  fetchSound,
  play,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundButton);
