import React,{Component, Fragment} from 'react'

import { db } from '../services/firebase'
import Quiz from './Quiz'

class Dashboard extends Component{
    constructor(props) {
		super(props);
		this.state = {
			grades : [],
			subjects : [],
			lesson : [],
			selectedGrade : '--Choose Grade--',
			selectedSubject : 'Choose Subject--',
      selectedLesson :'Choose Lesson',
      fg:"",
      fs:"",
      fl:""

		};
		this.changeGrade = this.changeGrade.bind(this);
		this.changeSubject = this.changeSubject.bind(this);
		this.changeLesson = this.changeLesson.bind(this);
    }
    componentWillMount(){
        console.log("mounted")
        db.collection('chapters')
        .get()
        .then( snapshot => {
          //console.log(snapshot)
          const lesson = []
          snapshot.forEach( doc => {
            doc = doc.data()
            lesson.push(doc)
          })
          //console.log(lesson);
          this.setState({lesson: lesson})
        })
        .catch( error => console.log(error))
        
        db.collection('subjects')
          .get()
          .then( snapshot => {
            //console.log(snapshot)
            const subjects = []
            snapshot.forEach( doc => {
              doc = doc.data()
              subjects.push(doc)
            })
            //console.log(subjects);
            this.setState({subjects: subjects})
          })
          .catch( error => console.log(error))
     
        db.collection('grades')
          .get()
          .then( snapshot => {
            //console.log(snapshot)
            const grades = []
            snapshot.forEach( doc => {
              doc = doc.data()
              grades.push(doc)
            })
            //console.log(grades);
            this.setState({grades:grades})
          })
          .catch( error => console.log(error))
      }

    
    
    changeGrade(event) {
		this.setState({selectedGrade: event.target.value});
	}

	changeSubject(event) {
		this.setState({selectedSubject: event.target.value});
	}
	changeLesson(event) {
		this.setState({selectedLesson: event.target.value});
		
	}
	handleSubmit=(e)=>{
    e.preventDefault();
	  this.setState({
      fg:this.state.selectedGrade,
      fs:this.state.selectedSubject,
      fl:this.state.selectedLesson
    })
    }


    render(){
        return(
            <div className="dashboard container">
                <form  className="white">
				<h2>Select the below Feilds:</h2>
				<div>
					<label>Subject :</label>
					<select placeholder="Subject" value={this.state.selectedSubject} onChange={this.changeSubject}>
						<option>--Choose Subject--</option>
						{this.state.subjects.map((e, key) => {
							return <option key={key}>{e.subject}</option>;
						})}
					</select>
				</div>
                <div>

					<label>Grade :</label>
					<select placeholder="Grade" value={this.state.selectedGrade} onChange={this.changeGrade}>
						<option>--Choose Grade--</option>
						{this.state.grades.map((e, key) => {
							return <option key={key}>{e.grade}</option>;
						})}
					</select>
				</div>
				
				<div>
					<label>Chapter :</label>
					<select placeholder="chapter" value={this.state.selectedLesson} onChange={this.changeLesson} >
						<option>--Choose chapter No--</option>
						{this.state.lesson.map((e, key) => {
							return <option key={key}  >{e.chapter}</option>;
						})}
					</select>
				</div>
        <div>
          <button onClick={this.handleSubmit}>Load Quiz</button>
        </div>
		
			</form>
		
      <h1> This is Dashboard....</h1>
               
               
        <Quiz ffs={this.state.fs} ffg={this.state.fg} ffl={this.state.fl} />
      </div>
        )
    }
}

export default Dashboard