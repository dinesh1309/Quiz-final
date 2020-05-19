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
    if (props.finalFormsubject!== state.subject){
       return {subject: props.finalFormsubject}
    }
    if (props.finalFormgrade!== state.grade) {
      return {grade: props.finalFormgrade}
    }
    if (props.finalFormlesson !== state.chapter){
      return {chapter: props.finalFormlesson}
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

    
  }

  componentDidUpdate(prevProps) {
    console.log("Quiz Updated")
    // Typical usage (don't forget to compare props):
    if (this.props.finalFormsubject !== prevProps.finalFormsubject) {
      db.collection('questions')
      .where("subject", "==", this.state.subject)
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
  }

  handleClick = () => {
    this.setState({
      currentPage: this.state.currentPage + 1 
    });
  }

  
  render() {

    console.log("Rendering...")
    console.log(this.props)
    console.log(this.state)
    const {questions, currentPage, questionsPerPage} = this.state;

    //logic for displaying questions
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestion = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const isLastQuestion = currentQuestion.length !== questionsPerPage || indexOfLastQuestion === questions.length;
    //console.log(currentQuestion)
  
    const renderQuestions = currentQuestion.map((question, index) => {
      return (
        <div className="card">
        <div key={index}>
        <div className="row">
        <div className="col-md-12" >
        <div className="qs">
             <p>Question: {question.question}</p>
                                </div>
          </div>
        </div>
        
            <div className="row">
              <div className="col-md-6" >
                  <div className="option"> 
                       <p>1. {question.op1}</p>
                  </div>
              </div>
              <div className="col-md-6" >
                  <div className="option"> 
                       <p>2. {question.op2}</p>
                  </div>
              </div>
              </div>
              <div class="row">
              <div className="col-md-6">
                  <div className="option"> 
                       <p>3. {question.op3}</p>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="option"> 
                       <p>4. {question.op4}</p>
                  </div>
              </div>
              </div>
              <div className="row">
        <div className="col-md-12" >
        <div className="ans">
        <p>Answer: {question.answer}</p>
                                </div>
          </div>
        </div>
        </div>
        </div>
      )
    });


    

    return (
      
      <div className="questions">
        {renderQuestions}
        <div className="nxt">
      {!isLastQuestion && <button  onClick={this.handleClick} className="btn btn-pill btn-info">Next Question <i className="glyphicon glyphicon-arrow-right"></i> ></button>}
      </div>
      </div>
    
    )
    
  }
}
export default Quiz;
