import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import removeSound from '../actions/removeSound';
import rgb from '../utils/rgb';

const left = {
  r: 17,
  g: 153,
  b: 142,
};

const right = {
  r: 56,
  g: 239,
  b: 125,
}

class SoundDropButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      rightHover: false,
    };
  }

  render() {
    const { filename, gradient, index } = this.props;
    const { hover, rightHover } = this.state;
    
    const r = rgb.r(left, right, gradient);
    const g = rgb.g(left, right, gradient);
    const b = rgb.b(left, right, gradient);

    return (<div
      className='soundButton'
      style={{
        backgroundColor: hover ? `rgba(${r}, ${g}, ${b}, 0.5)` : `rgb(${r}, ${g}, ${b})`,
        color: 'white',
        margin: '5px'
      }}
      onMouseEnter={() => { this.setState({ hover: true })}}
      onMouseLeave={() => { this.setState({ hover: false })}}
    >
      {
        hover && <div
          className='dropHoverButton dropHoverButtonRight'
          onClick={() => this.props.removeSound(index)}
          onMouseEnter={() => { this.setState({ rightHover: true })}}
          onMouseLeave={() => { this.setState({ rightHover: false })}}
          style={{
            boxShadow: rightHover ? 'rgba(0, 0, 0, 0.32) 0px 3px 10px, rgba(0, 0, 0, 0.46) 0px 3px 10px' : ''
          }}
        >
        x
        </div>
      }
      {filename.replace(new RegExp('_', 'g'), ' ').replace('.wav', '')}
    </div>);
  }
}

SoundDropButton.propTypes = {
  filename: PropTypes.string,
  gradient: PropTypes.number,
  removeSound: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  removeSound,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundDropButton);
