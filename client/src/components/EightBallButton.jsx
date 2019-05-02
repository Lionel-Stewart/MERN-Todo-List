import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EightBallButton extends Component {
  getRandomResponse = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    switch(randomNumber){
      case(0): 
        return 'It is certain';
      case(1): 
        return 'It is decidedly so';
      case(2): 
        return 'Most Likely';
      case(3): 
        return 'You should avoid doing so';
      case(4): 
        return 'Definitely Not';
      case(5): 
        return 'My sources say no';
      case(6): 
        return 'Outlook not so good';
      case(7): 
        return 'Signs point to yes';
      default:
       return 'I would wait until tomorrow';
      }
    }

  alertRandomResponse = () => {
    alert(`Should you ${this.props.goal.toLowerCase()} today? \n ${this.getRandomResponse()}`);
  }

  render(){
    return (
      <span className='eightball button' title='ask eight ball' onClick={this.alertRandomResponse}>
        <i className="fa fa-question-circle"></i>
      </span>
    );
  }
}

EightBallButton.propTypes = {
  goal: PropTypes.string.isRequired
}; 

export default EightBallButton;