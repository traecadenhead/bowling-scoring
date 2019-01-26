import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Roller extends Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.roll = this.roll.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

      roll(e){
          this.props.roll(e.target.value);
      }

    render(){
        let roll_options = [];
        if(this.props.max_next_roll_score !== undefined && this.props.max_next_roll_score !== null){
            for(let i = 0; i <= this.props.max_next_roll_score; i++){
                roll_options.push(i);
            }
        }

        return(
        <div className="roller">
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                How many pins did you knock down?
                </DropdownToggle>
                <DropdownMenu>
                    {roll_options.map((number) => {
                        return <DropdownItem key={number} value={number} onClick={this.roll}>{number}</DropdownItem>;
                    })}
                    <DropdownItem divider />
                    <DropdownItem value={null} onClick={this.roll}>Random</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        </div>
        )
    }
}