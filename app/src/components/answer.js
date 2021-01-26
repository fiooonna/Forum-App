import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../newquestion.css";

export class Answer extends React.Component{
  constructor (props){
    super(props);
  }
  deleteAns(){

  }
  render(){
    return(
      <div className="oneAnswer">
        <div className="answerUName">{this.props.answer.uname}</div>
        <div className="answerNamenDate">answered on {this.props.answer.time}</div>
        
        <div>{this.props.answer.content}</div>
      </div>
    )
  }
}
