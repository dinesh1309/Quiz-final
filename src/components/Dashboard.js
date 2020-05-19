import React,{Component} from 'react'
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
      formGrade:"",
      formSubject:"",
      formLesson:""

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
      fgformGrade:this.state.selectedGrade,
      formSubject:this.state.selectedSubject,
      formLesson:this.state.selectedLesson
    })
    }


    render(){
        return(
          <div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6 pb-5">
              <form>
                <div className="card border-info rounded-0">
                            <div className="card-header p-0">
                                <div className="bg-info text-white text-center py-2">
                                    <h3> Select the below fields</h3>
                                </div>
                            </div>
                  <div className="card-body p-3">
			            	<div className="form-group">
					            <label style={{color:'black'}} className="col-sm-2 col-form-label">Subject :</label>
					            <select  className="btn btn-info dropdown-toggle" placeholder="Subject" value={this.state.selectedSubject} onChange={this.changeSubject} >
					           	<option>--Choose Subject--</option>
					          	{this.state.subjects.map((e, key) => {
						        	return <option key={key}>{e.subject}</option>;
					          	})}
					           </select>
			            	</div>
                    <div className="form-group">
                      <label style={{color:'black'}} className="col-sm-2 col-form-label"  >Grade :</label>
					            <select className="btn btn-info dropdown-toggle" placeholder="Grade" value={this.state.selectedGrade} onChange={this.changeGrade}>
						          <option>-- Choose Grade --</option>
						          {this.state.grades.map((e, key) => {
							        return <option key={key}>{e.grade}</option>;
						          })}
					            </select>
				            </div>
				            <div className="form-group">
                      <label style={{color:'black'}} className="col-sm-2 col-form-label">Chapter :</label>
					            <select className="btn btn-info dropdown-toggle" placeholder="chapter" value={this.state.selectedLesson} onChange={this.changeLesson} >
						          <option>--Choose Chapter--</option>
						          {this.state.lesson.map((e, key) => {
						         	return <option key={key}  >{e.chapter}</option>;
						          })}
				            	</select>
				            </div>
                    <div className="text-center">
                      <button className="btn btn-info rounded-pill" style={{width:'18 rem'}}onClick={this.handleSubmit}>Load Quiz</button>
                    </div>
                 </div>
		            </div>
			        </form>
              </div>
           </div>    
            <div>    
             <Quiz finalFormsubject={this.state.formSubject} finalFormgrade={this.state.formGrade} finalFormlesson={this.state.formLesson} />
            </div>
          </div>
        )
    }
}

export default Dashboard