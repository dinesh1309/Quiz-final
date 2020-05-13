import React,{Component} from 'react';
import './App.css';
import { db } from './services/firebase'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: ""
    }
  }
  state = {
     
   }
 
  componentDidMount(){
    console.log("mounted")
    db.collection('questions')
      .get()
      .then( snapshot => {
        console.log(snapshot)
        const questions = []
        snapshot.forEach( doc => {
          doc = doc.data()
          questions.push(doc)
        })
        this.setState({questions: questions})
      })
      .catch( error => console.log(error))
  }


  
  render() {
    
    return (
      <div className="questions">
        <div>Quiz</div> 
        {
          this.state.questions &&
          this.state.questions.map( question => {
            return (
            <div>
              <p>Question: {question.question}</p>
              <p>1. {question.op1}</p>
              <p>2. {question.op2}</p>
              <p>3. {question.op3}</p>
              <p>4. {question.op4}</p>
              <p>Answer: {question.answer}</p>
            </div>
            )
          })
        }
      </div>
    )
    
  }
}
export default App;








