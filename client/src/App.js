import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Picker from './components/picker.js';

class App extends Component {
  render() {
    return (
      <div>
        <p>Hello World!</p>
        <Picker></Picker>
      </div>
    );
  }
}

export default App;
