import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class Frame extends Component{

    display_roll(number, index){
        if(number === 10){
            return "X";
        }
        else if (this.props.frame.frame_result === "spare" && index > 0){
            return "/";
        }
        else if (number === 0){
            return "-";
        }
        return number;
    }

    render(){
        let total = null;
        if(this.props.frame.frame_total != null){
            total = <Button>{this.props.frame.frame_total}</Button>
        }

        return (
            <Card>
                <CardBody>
                    <CardTitle>{this.props.frame.frame_number}</CardTitle>
                    <div className="rolls">
                        {this.props.frame.rolls.map((number, index) => {
                            return <div key={index}>{this.display_roll(number, index)}</div>;
                        })}
                    </div>
                    {total}
                </CardBody>
            </Card>
        )
    }
}