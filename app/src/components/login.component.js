import React, { Component } from "react";
import "../loginpage.css";
import Register from "./register.component";
import { withRouter } from "react-router-dom";
import MainPage from "./main-page.component";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onStateChange = this.onStateChange.bind(this);
    this.loginformSubmit = this.loginformSubmit.bind(this);
  }

  onStateChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  loginformSubmit(event) {
    event.preventDefault();
    if (this.state.email == "" || this.state.password == "") {
      alert("Fill in all the fields!");
    } else {
      axios
        .get("http://localhost:4000/forum/" + this.state.email)
        .then((res) => {
          if (!res.data[0]) {
            alert("User is not registered");
            this.setState({
              password: "",
            });
          } else if (res.data[0].password !== this.state.password) {
            alert("Unauthorized access");
            this.setState({
              password: "",
            });
          } else {
            localStorage.setItem('user',JSON.stringify(res.data[0]));
            this.setState({
              email: "",
              password: "",
            });
            this.props.history.push("/main");
          }
        });
    }
  }

  render() {
    return (
      <div className="rootWrap">
        <form className="signinContainer" onSubmit={this.loginformSubmit}>
          <h2 className="signinText">SIGN IN</h2>
          <div className="emailpasswordContainer">
            <div className="emailtext">Email</div>
            <input
              name="email"
              id="email"
              type="text"
              value={this.state.email}
              onChange={this.onStateChange}
            />
          </div>
          <div className="emailpasswordContainer">
            <div className="passwordtext">Password</div>
            <input
              name="password"
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.onStateChange}
            />
          </div>
          <button type="submit" className="loginBtn">
            Log in
          </button>
        </form>
        <div className="registerContainer">
          <p>Do not have an account?</p>
          <Link to="/register" className="btn btn-outline-primary">
            Register
          </Link>
        </div>
      </div>
    );
  }
}
