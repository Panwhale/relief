import React, { Component } from 'react';
import { render } from 'react-dom';
import Dropdown from 'react-dropdown';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      cause: '',
      rating: '',
      listOpen: false,
      headerTitle: this.props.title,
    };
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    const url = ('/home');
    const data = {
      location: this.state.location,
      cause: this.state.cause,
      rating: this.state.rating,
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({  

        });
      }).catch(err => console.log(err));
  };

  render() {
    return (
      <div className="filter-box">
        <form action="/home" className="userInfo">
        <input className="location" type="text" placeholder="location" onChange={e => { this.setState({ location: e.target.value }) }}></input>
        <input className="cause" type="text" placeholder="cause" onChange={e => { this.setState({ cause: e.target.value }) }}></input>
        <input className="rating" type="text" placeholder="rating" onChange={e => { this.setState({ rating: e.target.value }) }}></input>
        </form>
      </div>
    );
  }
}

export default Filters;
