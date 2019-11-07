import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            email: "",
            loggedIn: false,
        };
        this.updateData = this.updateData.bind(this);
    };

    // post request to send user input to database
    updateData() {
        const url = '/api/user/signup';
        const data = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
        };
        const handleLoggedIn = (res) => {
          console.log('handleLoggedIn', res)
          this.setState({
            loggedIn: true,
          });
        };
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((res) => handleLoggedIn.bind(this)(res))
          .catch((err) => console.log(err));
          console.log("here", data)
      }
    
    render() {
        let pages;
        if (this.state.loggedIn) {
            return <Redirect to={{ pathname: '/home', state: { username: this.state.username, password: this.state.password, email: this.state.email } }} />
        } else {
            pages =
                <div className="signupArea">
                    <div className="login-container">
                    <div className="signup-title"> <h2>“For it is in giving that we receive.”</h2></div>
                      <form action="/signup" className="userInfo">
                        <div className="text-field">
                          <input className="username" type="text" placeholder="username" onChange={e => { this.setState({ username: e.target.value }) }}></input>
                        </div>
                        <div className="text-field">
                          <input className="password" type="password" placeholder="password" onChange={e => { this.setState({ password: e.target.value }) }}></input>
                        </div>
                        <div className="text-field">
                          <input className="email" type="text" placeholder="email" onChange={e => { this.setState({ email: e.target.value }) }}></input>
                        </div>
                        <br />
                          <button className="loginbtn" type="submit" value="createUser" onClick={e => { e.preventDefault(); this.updateData()}}>Sign Up</button>
                      </form>
                    </div>
                </div>
        };
        return <div> {pages} </div>
    };
};

export default Signup;