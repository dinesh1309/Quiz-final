import React,{Component} from 'react';
import './App.css';
import { db } from './services/firebase'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: [],
      currentPage: 1,
      questionsPerPage: 1
    };
  }
  
 
  componentWillMount(){
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
        console.log(questions);
        this.setState({questions: questions})
      })
      .catch( error => console.log(error))
  }

  handleClick = () => {
    this.setState({
      currentPage: this.state.currentPage + 1 
    });
  }

  
  render() {
    const {questions, currentPage, questionsPerPage} = this.state;

    //logic for displaying questions
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestion = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    console.log(currentQuestion)
  
    const renderQuestions = currentQuestion.map((question, index) => {
      return (
        <div key={index}>
              <p>Question: {question.question}</p>
              <p>1. {question.op1}</p>
              <p>2. {question.op2}</p>
              <p>3. {question.op3}</p>
              <p>4. {question.op4}</p>
              <p>Answer: {question.answer}</p>
        </div>
      )
    });


    

    return (
      <div className="questions">
        <div>Quiz</div> 
        {renderQuestions}
      
      <button onClick={this.handleClick}>Next Question</button>
      </div>
    )
    
  }
}
export default App;








