import React,{Component} from 'react';
import MainPage from "./main-page.component";
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import '../newquestion.css';
import axios from 'axios';
import moment from "moment";
export default class NewQuestion extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      space:'',
      content:'',
      hits:''
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onValueChange(event) {
    const target=event.target;
    const value=target.value;
    const name=target.name;
    this.setState({
      [name]: value
    });
  }

  formSubmit(event) {
    event.preventDefault();
    if (this.state.title==''||this.state.space==''||this.state.content==''){
      alert("Please fill in all the fields!")
    }
    else{
      const today = moment();
      const user=JSON.parse(localStorage.getItem('user'));
      const newQuestion={
        title:this.state.title,
        space:this.state.space,
        content:this.state.content,
        time:today.format('DD-MM-YYYY'),
        creatorid:user._id,
        creatorName:user.name
      }
      axios.post('http://localhost:4000/forum/addQuestion',newQuestion)
        .then(res=>{
          this.setState({
            title: '',
            space:'',
            content:''
          });
          this.props.history.push("/main");
        })
        .catch(error=>{
          alert("There is some error when publishing this new question.")
        })

    }
  }


  render(){
    return(
      <div>
        <Link to="/main" className="backBtn" className="btn btn-outline-info">Back</Link>
        <div className="newPageContainer">
          <form className="askquestionContainer" onSubmit={this.formSubmit}>
            <h2 className="titleText">Ask your question</h2>
            <div>Title</div>
            <input className="titleinputbox" name ="title" type="text" value={this.state.title} onChange={this.onValueChange}/>
            <div>Space</div>
            <div>

              <div className="radio">
                <label>
                  <input
                    name="space"
                    type="radio"
                    value="Algorithm"
                    checked={this.state.space === "Algorithm"}
                    onChange={this.onValueChange}
                  />
                  Algorithm
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    name="space"
                    type="radio"
                    value="Machine Learning"
                    checked={this.state.space === "Machine Learning"}
                    onChange={this.onValueChange}
                  />
                  Machine Learning
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    name="space"
                    type="radio"
                    value="System"
                    checked={this.state.space === "System"}
                    onChange={this.onValueChange}
                  />
                  System
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    name="space"
                    type="radio"
                    value="Javascript"
                    checked={this.state.space === "Javascript"}
                    onChange={this.onValueChange}
                  />
                  Javascript
                </label>
              </div>
            </div>

            <div>Content</div>
            <textarea name ="content" className="contentBox" value={this.state.content} onChange={this.onValueChange}/>

            <button className="submitBtn" type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
