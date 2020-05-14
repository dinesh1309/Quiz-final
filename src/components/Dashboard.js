import React,{Component} from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends Component{
    render(){
        return(
            <div className="dashboard container">
                <h1> This is Dashboard....</h1>
                <h3> Drop-down to be updated here..</h3>
                <Link to='/quiz'>Click to go Quiz</Link>
               
                
            </div>
        )
    }
}

export default Dashboard