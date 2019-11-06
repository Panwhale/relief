import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

// import Filters from './components/Filters';
import CharityList from './components/CharityList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterState: 'filterStuff', // Delete later
      zip: '90291',
      charityState: 'chairityStuff', //Delete later
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
      currentTableListData: [{
        name: 'name 1',
        website: 'website 2',
        mission: 'mission 3',
        rate: 'rate 4',
        category: 'category 5',
        cause: 'cause 6',
        city: 'city 7',
        state: 'state 8',
        zip: 'zip 9',
        contact: 'contact 10'
      }],
      rows: [{
        name: 'name 1',
        website: 'website 2',
        mission: 'mission 3',
        rate: 'rate 4',
        category: 'category 5',
        cause: 'cause 6',
        city: 'city 7',
        state: 'state 8',
        zip: 'zip 9',
        contact: 'contact 10',
        ein: 'contact 11'
      }],
      defaultZip: '90013'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    // const defaultTableList = this.state.charityTopTenList[this.state.charityTopTenList.length - 1];
    // const body = {
    //   default: this.state.defaultTableList
    // };

    const body = {
      zip: this.state.defaultZip
    };

    axios({
      method: 'POST',
      url: '/api/charity',
      body: body
    })
      .then(res => {
        this.setState(prevState => {
          return {
            ...prevState,
            rows: res.data
          }
        })
        console.log(this.state.rows)
      })
  }

  handleChange (e) {
    this.setState({
      zip: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault();
 
    const body = {
      zip: this.state.zip
    };

    axios({
      method: 'POST',
      url: '/api/charity', 
      body: body
    })
    .then(res => {
      
      this.setState({
        currentTableListData: res.data,
      })
      console.log(this.state.currentTableListData);
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
        <CharityList charityState={this.state.charityState} rows={this.state.rows}/>
      </div>
    )
  }

}

export default App;