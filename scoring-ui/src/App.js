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
    }, (e) => {
      this.setState({
        message: e
      })
    });
  }

  roll(value){
    this.setState({
      message: null
    });
    let roll_score = parseInt(value);
    api.score_roll(roll_score).then((message) => {
      let show_message = null;
      if (message !== "Roll was scored"){
        show_message = message;
      }
      this.update_game_state(show_message);
    }, (e) => {
      this.setState({
        message: e
      })
    });
  }

  update_game_state(message){
    this.setState({
      message
    });
    api.get_game().then((game) => {
      this.setState({
        game
      });
      if(game.status === "complete"){
        this.setState({
          message: "The game is complete!"
        });
      }
    }, (e) => {
      this.setState({
        message: e
      })
    });
  }

  render() {
    let game_screen = null;
    if (this.state.game != null){
      game_screen = <Game game={this.state.game} roll={this.roll.bind(this)} start_game={this.start_game.bind(this)}/>;
    }
    else{
      game_screen = <div className="start">
        <Start start_game={this.start_game.bind(this)} game_desc={"the"}/>
      </div>;
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
