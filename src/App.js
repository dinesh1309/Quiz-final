import React,{Component} from 'react';
import './App.css';
import data from './sampledata.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
	};    

  }
 
  
  goToNext = () => {
    this.setState({ index: (this.state.index + 1) % data.length });
  };
  
  render() {
    const item = data[this.state.index];
    return (<div><h3>Question.{this.state.index+1}:{item.question}</h3>
		<p>{item.op1}</p>
		<p>{item.op2}</p>
		<p>{item.op3}</p>
		<p>ANS: {item.Ans}</p>
		<button onClick={this.goToNext}>next</button></div>);
  }
}
export default App;








