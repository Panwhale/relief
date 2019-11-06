import React, { Component } from 'react';
import { render } from 'react-dom';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
        };
        this.updateData = this.updateData.bind(this);
    };

    // post request to send user input to database
    updateData() {
        const url = ('/signup');
        const data = {
            username: this.state.username,
            password: this.state.password
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                loggedIn: res.loggedIn,
            });
        }).catch(err => console.log(err));
    };


    // if the user has already signed up, then it will redirect to the homepage, else it will direct to the signup page
    render() {
        let pages;
        if (this.state.loggedIn) {
            return <Redirect to={{ pathname: '/homepage', state: { username: this.state.username, password: this.state.password } }} />
        } else {
            pages =
                <div className="signupArea">
                    <div className="login-container">
                      <div className="login-header">Create An Account</div>
                      <form action="/signup" className="userInfo">
                        <div className="text-field">
                          <input className="username" type="text" placeholder="username" onChange={e => { this.setState({ username: e.target.value }) }}></input>
                        </div>
                        <div className="text-field">
                          <input className="password" type="password" placeholder="password" onChange={e => { this.setState({ password: e.target.value }) }}></input>
                        </div>
                        <br />
                          <button className="loginbtn" type="submit" value="createUser" onClick={e => { e.preventDefault(); this.updateData()}}>Sign Up</button>
                      </form>
                    </div>
                </div>
        };
        return <div>{pages}</div>
    };
};

export default Signup;