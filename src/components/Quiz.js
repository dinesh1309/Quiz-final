import React,{Component} from 'react';
import '../App.css';
import { db } from '../services/firebase'

class Quiz extends Component {
  constructor(props){
    super(props);
    console.log("constructor")
    console.log(this.props)
    this.state = {
      questions: [],
      currentPage: 1,
      questionsPerPage: 1,
      subject: "",
      grade: "",
      chapter: ""
    };
    console.log("Quiz State")
    console.log(this.state)
  }
  
  static getDerivedStateFromProps(props, state){
    console.log("getDerivedStateFromProps Started")
    console.log(props)
    if (props.selectedSubject !== state.subject){
       return {subject: props.selectedSubject}
    }
    if (props.selectedGrade !== state.grade) {
      return {grade: props.selectedGrade}
    }
    if (props.selectedLesson !== state.chapter){
      return {chapter: props.selectedLesson}
    }
  }

 /*  shouldComponentUpdate() {
    console.log("shouldComponentUpdate")
    console.log(this.props)
    return true;
  } */

  componentDidMount(){
    console.log("Quiz mounted")
    console.log(this.props)
    
   //fetch questions from firebase based on state

     db.collection('questions')
     .where("subject", "==", "evs")
     .get()
     .then( snapshot => {
       //console.log(snapshot)
       const questions = []
       snapshot.forEach( doc => {
         doc = doc.data()
         questions.push(doc)
       })
       //console.log(questions);
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

    console.log("Rendering...")
    console.log(this.props)
    const {questions, currentPage, questionsPerPage} = this.state;

    //logic for displaying questions
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestion = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const isLastQuestion = currentQuestion.length !== questionsPerPage || indexOfLastQuestion === questions.length;
    //console.log(currentQuestion)
  
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
      {!isLastQuestion && <button onClick={this.handleClick}>Next Question</button>}
      </div>
    )
    
  }
}
export default Quiz;








