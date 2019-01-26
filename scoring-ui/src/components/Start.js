import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class Start extends Component{

    render(){
        return(
            <Button color="success" onClick={this.props.start_game}>
                Start the Game!
            </Button>
        )
    }
}