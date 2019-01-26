import React, { Component } from 'react';
import Frame from './Frame';

export default class Frames extends Component{

    render(){
        return(
            <div className="frames">
                {this.props.frames.map((frame, index) => {
                    return <Frame key={index} frame={frame} />;
                })}
            </div>
        )
    }
}