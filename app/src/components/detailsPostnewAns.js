import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import "../newquestion.css";

export class PostNewAnswer extends React.Component{
  constructor (props){
    super(props);
    this.state={
      content:''
    };
    this.onAnswerChange=this.onAnswerChange.bind(this);
    this.answerSubmit=this.answerSubmit.bind(this);
  }
  onAnswerChange(event){
    const target=event.target;
    const value=target.value;
    const name=target.name;
    this.setState({
      [name]: value
    });
  }
  cancel(){
    this.setState({
      content:''
    })
  }
  answerSubmit(event){
    event.preventDefault();
    if (this.state.content==''){
      alert("Your answer field is blank")
    }
    else{

      const today=moment();
      const user=JSON.parse(localStorage.getItem('user'));
      const newAnswer={
        qid:JSON.parse(localStorage.getItem('question'))._id,
        content:this.state.content,
        uid:user._id,
        uname:user.name,
        time:today.format('DD-MM-YYYY')
      }

      axios.post('http://localhost:4000/forum/addAnswer',newAnswer)
            .then(res=>{
              window.location.reload();
              this.setState({
                content:''
              });
            })
            .catch(error=>{
              alert("Publishing answer fails.")
            })
    }
  }
  render(){
    return(
      <form className="newAnswerWrapper" onSubmit={this.answerSubmit}>
        <div className="userNamenewAnswer">{JSON.parse(localStorage.getItem("user")).name}</div>
        <div className="postanswerLabel">Post your new answer.</div>
        <textarea name="content" className="newAnswerBox" value={this.state.content} onChange={this.onAnswerChange}/>
        <button className="newAnswerSubmitBtn" type="submit">Submit</button>
        <div className="cancelBtn" onClick={this.cancel.bind(this)}>Cancel</div>

      </form>
    )
  }
}
