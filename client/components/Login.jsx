import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      verified: false,
    };
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    const url = '/api/user/signin';
    const data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };
    const handleVerified = (res) => {
      this.setState({
        verified: res.verified,
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
      // .then(handleVerified.bind(this)).catch((err) => console.log(err));
      .then((res) => handleVerified.bind(this)(res))
      .catch((err) => console.log(err));
      console.log("here", data)
  }

  render() {
    let pages;
    if (this.state.verified) {
      return <Redirect to={{ pathname: '/home', state: { username: this.state.username, password: this.state.password, email: this.state.email } }} />
  } else {
    pages=
      <div className="loginArea">
              <div className="signin-box">
                <div className="signin-title"> <h2>“We only have what we give.”</h2></div>
                <form action="/signin" className="userInfo">
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
                    <button className="loginbtn" type="submit" onClick={e => {
                            e.preventDefault(); this.updateData();
                        }}>Log In</button>
                       <div className="sign-up-link">
                          <Link to="./signup">Sign Up</Link>
                      </div>
                </form>
              </div>
          </div>
  }
          return <div>{pages}</div>
  };
};

export default Login;