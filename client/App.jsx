import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

// import Filters from './components/Filters';
import ChairityList from './components/CharityList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterState: 'filterStuff', // Delete later
      zip: '90291',
      chairityState: 'chairityStuff', //Delete later
      charityTopTenList: [
        'Charities with Perfect Scores',
        '10 Most Followed Charities',
        '10 Charities Expanding in a Hurry',
        '10 Most Frequently Viewed Charities',
        '10 Celebrity-Related Charities',
        '10 Super-Sized Charities',
        '10 Charities Overpaying their For-Profit Fundraisers',
        '10 Charities with the Most Consecutive 4-Star Ratings',
        '10 Highly Rated Charities Relying on Private Contributions',
        `10 of the Best Charities Everyone's Heard Of`,
        '10 Charities Worth Watching',
      ],
      currentTableListData: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  // componentDidMount() {
  //   const defaultTableList = this.state.charityTopTenList[this.state.charityTopTenList.length - 1];
  //   const body = {
  //     default: this.state.defaultTableList
  //   };

  //   axios({
  //     method: 'get',
  //     url: '/blah', //need specific route 
  //     data: body,
  //   })
  //   .then(function (res) {
  //     this.setState(prevState => {
  //       return {
  //         ...prevState,
  //         currentTableListData: res,
  //       }
  //     })
  //   })
  // }

  handleChange (e) {
    this.setState({
      zip: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    // this.setState(prevState => ({
    //   zip: prevState.zip.concat(this.state.zip),
    // }))
    // console.log(this.state.zip)

    
    const body = {
      zip: this.state.zip
    };

    axios({
      method: 'post',
      url: '/api/charity/:ein', //need specific route 
      data: body,
    })
    .then(function (res) {
      console.log(res);
      this.setState(prevState => {
        return {
          ...prevState,
          currentTableListData: res,
        }
      })
    })

  }

  render() {
    return (
      <div>
        Filters
        <form onSubmit={this.handleSubmit}>
          <input defaultValue={this.state.zip} onChange={(e) => this.handleChange(e)} />
          <button>Submit</button>
        </form>
        <br />
        <br />
        {this.state.zip}
        <br />
        <ChairityList chairityStuff={this.state.chairityState} currentTableListData={this.state.currentTableListData}/>
      </div>
    )
  }

}

export default App;