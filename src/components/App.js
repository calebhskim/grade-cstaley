import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import PlaySounds from './PlaySounds';
import SoundDrop from './SoundDrop';
import Sounds from './Sounds';
import Title from './Title';

class App extends Component {
  render() {
    return (
      <div className='appContainer'>
        <Title />
        <div className='playlistContainer'>
          <SoundDrop />
          <PlaySounds />
        </div>
        <hr className='horizontalLine' />
        <Sounds />
        <footer className='footer'>
          <p>&copy; <a href='https://www.youtube.com/watch?v=95sK_dJyWHA' target='YUHTUB'>Software Inventions 2017</a></p>
        </footer>
      </div>
    );
  }
};

export default DragDropContext(HTML5Backend)(App);
