import React, { Component } from 'react';
import './App.css';
import api from './config/api';
import Start from './components/Start';
import Game from './components/Game';
import Message from './components/Message';

class App extends Component {

  constructor(props){
    super(props); 
    this.state = {
      game: null,
      message: null
    }
  }

  start_game() {
    api.start_game().then((message) => {
      this.update_game_state(message);
    });
  }

  roll(value){
    let roll_score = parseInt(value);
    api.score_roll(roll_score).then((message) => {
      this.update_game_state(message);
    });
  }

  update_game_state(message){
    this.setState({
      message
    });
    api.get_game().then((game) => {
      this.setState({
        game
      })
    }, (e) => {
      this.setState({
        message: e
      })
    });
  }

  render() {
    let game_screen = null;
    if (this.state.game != null){
      game_screen = <Game game={this.state.game} roll={this.roll.bind(this)}/>;
    }
    else{
      game_screen = <Start start_game={this.start_game.bind(this)}/>;
    }
    return (
      <div className="App">
        <Message message={this.state.message}/>
        {game_screen}
      </div>
    );
  }
}

export default App;
