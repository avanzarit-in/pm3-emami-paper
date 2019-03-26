import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
 
export default class Date1 extends Component {
  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })
 
  render() {
    return (
      <div>
        <DatePicker
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}