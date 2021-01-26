import React, { Component } from "react";
import NewQuestion from "./new-question.component";
import QuestionDetails from "./question-details.component";
import Login from "./login.component";
import Register from "./register.component";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../mainpage.css";
import {Question} from "./question";




export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      filter:'-date',
      filterOut:'none',
      search:''
    };
    this.hotbutton=this.hotbutton.bind(this);
    this.onSearchChange=this.onSearchChange.bind(this);
  }
  onSearchChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    console.log(this.state.search);
    axios
      .get("http://localhost:4000/forum/getQuestion/"+this.state.filter+"/"+this.state.filterOut+"/"+this.state.search)
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/forum/getQuestion/"+this.state.filter+"/"+this.state.filterOut+"/"+this.state.search)
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  questionList() {
    return this.state.questions.map(function (currentQuestion, i) {
      return <Question question={currentQuestion} key={i} />;
    });
  }
  sortAlgorithm=async () =>{
    await this.setState((prevState,props)=>{
      return {filterOut:'Algorithm'};
    });
    axios
      .get("http://localhost:4000/forum/getQuestion/"+this.state.filter+"/"+this.state.filterOut+"/"+this.state.search)
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  sortML=async()=>{
    await this.setState((prevState,props)=>{
      return {filterOut:'Machine Learning'};
    });
    axios
      .get("http://localhost:4000/forum/getQuestion/"+this.state.filter+"/"+this.state.filterOut+"/"+this.state.search)
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  sortSystem=async()=>{
    await this.setState((prevState,props)=>{
      return {filterOut:'System'};
    });
    axios
      .get("http://localhost:4000/forum/getQuestion/"+this.state.filter+"/"+this.state.filterOut+"/"+this.state.search)
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  reSetfilterOut=async()=>{
    await this.setState((prevState,props)=>{
      return {filter:'-date',
              filterOut:'none'};
    });
    axios
      .get("http://localhost:4000/forum/getQuestion/"+this.state.filter+"/"+this.state.filterOut+"/"+this.state.search)
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  sortJS=async()=>{
    await this.setState((prevState,props)=>{
      return {filterOut:'Javascript'};
    });
    axios
      .get("http://localhost:4000/forum/getQuestion/"+this.state.filter+"/"+this.state.filterOut+"/"+this.state.search)
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  hotbutton= async () => {
    await this.setState((prevState,props)=>{
      return {filter:'-vote'};
    });
    axios
      .get("http://localhost:4000/forum/getQuestion/"+this.state.filter+"/"+this.state.filterOut+"/"+this.state.search)
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  logout() {
    console.log("logging out");
    localStorage.removeItem("user");
    window.location.reload();
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <h1 onClick={this.reSetfilterOut.bind(this)} className="ques">Ques</h1>
          <Link to="/main" className="brand" onClick={this.reSetfilterOut.bind(this)}>
            Home
          </Link>
          <div className="brand" onClick={this.hotbutton.bind(this)}>Hot</div>
          <input name="search" id="searchbox" type="text" value={this.state.search} onChange={this.onSearchChange}/>
          {localStorage.getItem("user") ? (
            <div className="logoutBtncontainer">
              <div
                className="btn btn-outline-secondary"
                onClick={this.logout.bind(this)}
              >
                Log out
              </div>
            </div>
          ) : (
            <div className="loginRegisterContainer">
              <div className="loginRegisterItems">
                <Link to="/login">Login</Link>
              </div>
              <div className="loginRegisterItems">
                <Link to="/register">Register</Link>
              </div>
            </div>
          )}
        </nav>
        {localStorage.getItem("user") ? (
          <div className="askbuttonWrapper">
            <Link to="/ask" className="btn btn-primary">
              Ask Question
            </Link>
          </div>
        ) : (
          console.log("hided ask question button")
        )}

        <div className="leftBar">
        <div className="leftBarItems" onClick={this.sortAlgorithm.bind(this)}>Algorithm</div>
        <div className="leftBarItems" onClick={this.sortML.bind(this)}>Machine Learning</div>
        <div className="leftBarItems" onClick={this.sortSystem.bind(this)}>System</div>
        <div className="leftBarItems" onClick={this.sortJS.bind(this)}>JavaScript</div>
        </div>
        <div className="centralArea">
        {localStorage.getItem("user") ? (
          <div className="askbuttonWrapper">
            <Link to="/ask" className="btn btn-primary">
              Ask Question
            </Link>
          </div>
        ) : (
          console.log("hided ask question button")
        )}
          <div className="reallyCentral">
          {localStorage.getItem("user") ? (
            <div className="topQuestionbar">
              <div>{JSON.parse(localStorage.getItem("user")).name}</div>
              <p
                className="headingquestionlabel"
                onClick={() => {
                  this.props.history.push("/ask");
                }}
              >
                What is your question?
              </p>
            </div>
          ) : (
            console.log("hided top ask question bar")
          )}
          <div className="table table-striped" style={{ marginTop: 20 }}>
            <div className="OneQuestionAnswerContainer">{this.questionList()}</div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
