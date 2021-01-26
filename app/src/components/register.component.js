import React,{Component} from 'react';
import { withRouter } from "react-router-dom";
import '../registerpage.css';
import MainPage from "./main-page.component";
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import axios from 'axios';

export default class Register extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email: '',
      password:'',
      confirmation:''
    };
    this.onStateChange = this.onStateChange.bind(this);
    this.registerformSubmit = this.registerformSubmit.bind(this);
  }

  onStateChange(event) {
    const target=event.target;
    const value=target.value;
    const name=target.name;
    this.setState({
      [name]: value
    });
  }

  registerformSubmit(event) {
    event.preventDefault();
    if (this.state.name==''||this.state.email==''||this.state.password==''||this.state.confirmation==''){
      alert("Please fill in all the fields!")
    }
    else if (this.state.password !==this.state.confirmation){
      alert("Confirmation password is not the same as the password. Please modify.")
    }
    else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email))){
      alert("Email address invalid. Please fill in the email address again.")
    }
    else{
      const newUser={
        name:this.state.name,
        email:this.state.email,
        password:this.state.password
      }

      axios.post('http://localhost:4000/forum/addUser',newUser)
           .then(res=>{
             console.log(res.data[0]);
             localStorage.setItem('user',JSON.stringify(res.data[0]));
             this.setState({
               name:'',
               email: '',
               password:'',
               confirmation:''
             });
             this.props.history.push("/main");

           })
           .catch(error=>{
             alert("Duplicated user's email address");
           })

    }
  }

  render(){
    return(
      <div className="registerRoot">
        <form className="registerpageContainer" onSubmit={this.registerformSubmit}>
          <h2 className="createAccountText">Create an Account</h2>
          <div className="labelandinputcontainer">
            <div className="namelabel">Name</div>
            <input name="name" className="inputField" id ="name" type="text" value={this.state.name} onChange={this.onStateChange}/>
          </div>
          <div className="labelandinputcontainer">
            <div className="emaillabel">Email</div>
            <input name="email" className="inputField" id ="email" type="text" value={this.state.email} onChange={this.onStateChange}/>
          </div>
          <div className="labelandinputcontainer">
            <div className="passwordlabel">Password</div>
            <input name="password" className="inputField" id ="password" type="password" value={this.state.password} onChange={this.onStateChange}/>
          </div>
          <div className="labelandinputcontainer">
            <div className="confirmationlabel">Confirmation</div>
            <input name="confirmation" className="inputField" id ="confirmation" type="password" value={this.state.confirmation} onChange={this.onStateChange}/>
          </div>
          <button type="submit" className="registerpageBtn">Register</button>

        </form>

      </div>
    )
  }
}
