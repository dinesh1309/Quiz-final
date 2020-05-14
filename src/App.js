import React,{Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Quiz from './components/Quiz'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/quiz' component={Quiz}/>
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
  
export default App;