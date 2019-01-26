import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class Frame extends Component{

    render(){
        let total = null;
        if(this.props.frame.frame_total != null){
            total = <Button>{this.props.frame.frame_total}</Button>
        }

        return (
            <Card>
                <CardBody>
                    <CardTitle>Frame {this.props.frame.frame_number}</CardTitle>
                    {this.props.frame.rolls.map((number, index) => {
                        return <CardSubtitle key={index}>{number}</CardSubtitle>;
                    })}
                    {total}
                </CardBody>
            </Card>
        )
    }
}