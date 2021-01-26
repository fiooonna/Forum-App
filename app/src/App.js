import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NewQuestion from "./components/new-question.component";
import QuestionDetails from "./components/question-details.component";
import MainPage from "./components/main-page.component";
import Login from "./components/login.component";
import Register from "./components/register.component";

class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <Route path="/main" exact component={MainPage}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/detail" component={QuestionDetails}/>
          <Route path="/ask" component={NewQuestion}/>
        </div>

      </Router>
    );
  }
}

export default App;
