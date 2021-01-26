import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../questionDetail.css";
import ShowMoreText from 'react-show-more-text';
import {Answer} from "./answerrr";
import {PostNewAnswer} from "./detailsPostnewAns";

export default class QuestionDetails extends Component{
  upvote= async () =>{

    let qid=JSON.parse(localStorage.getItem("question"))._id;
    if(localStorage.getItem("user")){
    axios.post('http://localhost:4000/forum/upvote/'+qid+'/'+JSON.parse(localStorage.getItem("user"))._id)
      .then(res=>{
        console.log(res.data);
        localStorage.setItem('question',JSON.stringify(res.data));
        window.location.reload(false);
      })
      .catch(error=>{
        console.log("upvote system fails");
      }

    )}

  }
  constructor (props) {
    super(props);
    this.state = {
      answers: [],
      voted:false,
    };
  }
  componentDidMount() {
    axios.get("http://localhost:4000/forum/getAnswer/"+JSON.parse(localStorage.getItem("question"))._id)
      .then((response) => {
        this.setState({ answers: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  addAnswerList(){
    return this.state.answers.map(function (currentAnswer, i) {

      return <Answer answer={currentAnswer} key={i} />;

    });
  }
  addPostAnswer(){
    if (localStorage.getItem("user")){
      return <PostNewAnswer question={localStorage.getItem("question")}/>;
    }
  }
  edit(){

  }
  delete(){
    axios.post("http://localhost:4000/forum/deleteQuestion/"+JSON.parse(localStorage.getItem("question"))._id)
    .then(res=>{
      console.log("deleted");
      this.props.history.push("/main");

    })
    .catch(error=>{
      console.log("can't delete question");
    }

  )
  }
  render(){
    return(
      <div>
        <Link to="/main">back</Link>
        <div className="OneQuestionAnswerContainer">
          <div className="aQuestion">
            <div className="nameandQuestionContainer">
            <div className="nameanddateContainer">
            <div className="questionSpace">{JSON.parse(localStorage.getItem("question")).space}</div>
              <div className="creatorName">{JSON.parse(localStorage.getItem("question")).creatorName}</div>
              <div className="date">{JSON.parse(localStorage.getItem("question")).time}</div>
            </div>
            <div className="questionAllContentContainer">
              <div className="questionTitle">{JSON.parse(localStorage.getItem("question")).title}</div>
              <div className="questionContent">{JSON.parse(localStorage.getItem("question")).content}</div>
            </div>
          </div>
          <div className="upvoteAnswerContainer">
            <div className="upvote" onClick={this.upvote.bind(this)}>Upvote ({(JSON.parse(localStorage.getItem("question")).up).length})</div>

            {localStorage.getItem("user") && (JSON.parse(localStorage.getItem("user"))._id==JSON.parse(localStorage.getItem("question")).creatorid) ?
              <div className="both">
                <div className="cursor" onClick={this.edit.bind(this)}>Edit</div>
                <div className="delte" onClick={this.delete.bind(this)}>Delete</div>
              </div>
            : console.log("different")}
          </div>
          </div>
          <div className="widthControl">
          <div className="allAnswers">{this.addAnswerList()}</div>
          <div className="allAnswers">{this.addPostAnswer()}</div>
          </div>
          </div>
        </div>

    )
  }
}
