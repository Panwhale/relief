import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import Filters from './components/Filters';
import ChairityList from './components/CharityList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterState: 'filterStuff', // Delete later
      chairityState: 'chairityStuff', //Delete later
      chairityTopTenList: [
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
  }


  componentDidMount() {
    // const defaultTableList = this.state.chairityTopTenList[this.state.chairityTopTenList.length - 1];
    // const body = {
    //   default: this.state.defaultTableList
    // };

    // axios({
    //   method: 'get',
    //   url: '/blah', //need specific route 
    //   data: body,
    // })
    // .then(function (res) {
    //   this.setState(state => {
    //     return {
    //       ...state,
    //       currentTableListData: res,
    //     }
    //   })
    // })


    this.setState(state => {
      return {
        ...state,
        currentTableListData: 'hi',
      }
    })
  }

  render() {
    return (
      <div>
        <div className="title">
        <h1>RELIEF</h1>
        </div>
        <Filters filterStuff={this.state.filterState}/>
        <br />
        <br />
        <br />
        <ChairityList chairityStuff={this.state.chairityState} currentTableListData={this.state.currentTableListData}/>
      </div>
    )
  }

}

export default App;