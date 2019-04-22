import React, { Component} from 'react';
import MonthCalendar from '../calendar/monthCalendar/MonthCalendar';
import { Modal} from 'semantic-ui-react';
import moment from 'moment';

export default class DateEditor extends Component {
    constructor(props) {
      super(props);
      this.state = {
          date: new Date(),
        }
       
    }
   
    onChange = date => this.setState({ date })
  
    
  
    
    render() {
      return (
     
        <Modal open={this.state.showModal} size='tiny' closeOnEscape={true}
        closeOnDimmerClick={true} centered={false} onClose={this.close}>
        <Modal.Header>Select Date</Modal.Header>
        <Modal.Content >
            <MonthCalendar date={moment()} callback={this.setDate} />
        </Modal.Content>

    </Modal>
      );
    }
  }
  