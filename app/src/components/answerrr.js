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
    axios.post("http://localhost:4000/forum/deleteAnswer/"+this.props.answer._id)
    .then(res=>{
      console.log("deleted");
      window.location.reload(false);

    })
    .catch(error=>{
      console.log("can't delete answer");
    }

  )
  }
  render(){
    return(
      <div className="oneAnswer">
        <div className="answerUName">{this.props.answer.uname}</div>
        <div className="answerNamenDate">answered on {this.props.answer.time}</div>

        <div>{this.props.answer.content}</div>
        {localStorage.getItem("user") && (JSON.parse(localStorage.getItem("user"))._id==this.props.answer.uid) ?
        <div className="btnnnn" onClick={this.deleteAns.bind(this)}>Delete</div>
        :
        <div/>
      }
      </div>
    )
  }
}
