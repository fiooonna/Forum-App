import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Answer} from "./answer";
import {PostNewAnswer} from "./postnewanswer";
import "../newquestion.css";
import ShowMoreText from 'react-show-more-text';

export class Question extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      answers: [],
      voted:false,
    };
  }
  componentDidMount() {
    axios.get("http://localhost:4000/forum/getAnswer/"+this.props.question._id)
      .then((response) => {
        this.setState({ answers: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  upvote= async () =>{
    let qid=this.props.question._id;
    if(localStorage.getItem("user")){
    axios.post('http://localhost:4000/forum/upvote/'+qid+'/'+JSON.parse(localStorage.getItem("user"))._id)
      .then(res=>{
        window.location.reload();
        if (this.state.voted==false){
          console.log("sdfgfg")
          this.setState({voted:true})
        }
        else{
          this.setState({voted:false})
        }
        console.log("upvoted system ok");
      })
      .catch(error=>{
        console.log("upvote system fails");
      }

    )}

  }
  gotoDetail(){
    if (!localStorage.getItem("question")){
      localStorage.setItem('question',JSON.stringify(this.props.question));
    }
    else{
      localStorage.removeItem("question");
      localStorage.setItem('question',JSON.stringify(this.props.question));
    }
  }
  answerList(){
    this.setState({
      clicked:true
    })
    if (this.state.clicked==true){
      this.setState({clicked:false})
    }
  }
  addAnswerList(){
    return this.state.answers.map(function (currentAnswer, i) {

      return <Answer answer={currentAnswer} key={i} />;

    });
  }
  addPostAnswer(){
    if (localStorage.getItem("user")){
      return <PostNewAnswer question={this.props.question}/>;
    }
  }
  executeOnClick(isExpanded) {
        console.log(isExpanded);
    }
  render(){
    return(
      <div>
      <div className="oneQuestionContainer">

        <div className="nameandQuestionContainer">
          <div className="nameanddateContainer">
          <div className="questionSpace">{this.props.question.space}</div>
            <div className="creatorName">{this.props.question.creatorName}</div>
            <div className="date">{this.props.question.time}</div>
          </div>
          <div className="questionAllContentContainer">
            <Link to="/detail" onClick={this.gotoDetail.bind(this)} className="questionTitle">{this.props.question.title}</Link>
            <ShowMoreText lines={3}
                more='Show more'
                less='Show less'
                onClick={this.executeOnClick}
                expanded={false}
                 className="questionContent">{this.props.question.content}</ShowMoreText>
          </div>
        </div>
        <div className="upvoteAnswerContainer">
          <div className="upvote" onClick={this.upvote.bind(this)}>Upvote ({(this.props.question.up).length})</div>

          <div className="answer" onClick={this.answerList.bind(this)}>Answer ({(this.props.question.answer).length})</div>

        </div>

      </div>
      {this.state.clicked?(<div className="commentWrapper">
      <div className="allAnswers">{this.addAnswerList()}</div>
      <div className="allAnswers">{this.addPostAnswer()}</div></div>)
    :
      (<div></div>)}
      </div>
    );
  }

}
