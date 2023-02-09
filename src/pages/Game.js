import React, { Component } from 'react';
import Perguntas from './Perguntas';

export default class Game extends Component {
  render() {
    return (
      <div>
        <h2>Show do milhão</h2>
        <Perguntas />
      </div>
    );
  }
}
