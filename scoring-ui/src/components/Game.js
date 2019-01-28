import React, { Component } from 'react';
import Roller from './Roller';
import Frames from './Frames';
import Start from './Start';

export default class Game extends Component{

    render(){
        let roller = null;
        if(this.props.game.status === "started"){
            roller = <Roller max_next_roll_score={this.props.game.max_next_roll_score} roll={this.props.roll} />
        }
        let start_new = null;
        if(this.props.game.status === "complete"){
            start_new = <div className="new-start">
                <Start start_game={this.props.start_game} game_desc={"New"}/>
            </div>
        }

        return (<div>
            {roller}
            <Frames frames={this.props.game.frames} />
            {start_new}
        </div>
        )
    }
}