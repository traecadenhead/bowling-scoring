import React, { Component } from 'react';
import Roller from './Roller';
import Frames from './Frames';

export default class Game extends Component{

    render(){
        let roller = null;
        if(this.props.game.status === "started"){
            roller = <Roller max_next_roll_score={this.props.game.max_next_roll_score} roll={this.props.roll} />
        }

        return (<div>
            {roller}
            <Frames frames={this.props.game.frames} />
        </div>
        )
    }
}