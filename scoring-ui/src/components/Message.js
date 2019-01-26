import React, { Component } from 'react';
import { Alert } from 'reactstrap';

export default class Start extends Component{

    render(){
        let message = null;
        if (this.props.message != null){
            message = <Alert color="primary">{this.props.message}</Alert>;
        }
        return(message)
    }
}