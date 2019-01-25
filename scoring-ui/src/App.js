import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Alert } from 'reactstrap';
import app_state from './config/app_state';
import api from './config/api';

class App extends Component {

  constructor(props){
    super(props); 
    this.state = app_state.get_initial_state();
  }

  start_game() {
    api.start_game((message) => {
      this.setState({
        message
      });
    });
  }

  render() {
    let message = null;
    if (this.state.message != null){
      message = (
        <Alert color="primary">{this.state.message}</Alert>
      )
    }
    let game_screen = (
      <Button color="success" onClick={this.start_game}>Start the Game!</Button>
    )
    if (this.state.game != null){
      game_screen = (
        <div>Game has started</div>
      )
    }
    return (
      <div className="App">
        {message}
        {game_screen}
      </div>
    );
  }
}

export default App;
