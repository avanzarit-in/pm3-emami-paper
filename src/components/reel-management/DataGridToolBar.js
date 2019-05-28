import React, { Component } from 'react';
import Calendar from '../calendar/Calendar'
import moment from 'moment';
import { Modal,Button,Icon } from 'semantic-ui-react';
export default class DataGridToolBar extends Component {

state={fromDate:moment(),
toDate:moment(),
date : moment()}
    dateSelected = (fromDate, toDate) => {
        this.setState({
            fromDate:fromDate,
            toDate: toDate
    });
        let formattedFromDate = fromDate.format("DD.MM.YYYY");
        let formattedToDate = toDate.format("DD.MM.YYYY");


    }

    handleCalendarOpen = () => this.setState({ calendarModalOpen: true })

    handleCalendarClose = () => this.setState({ calendarModalOpen: false })

    render() {
        return (
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div >Lot No: <b>3K18/45001</b></div>
                <Modal
                    style={{ height: '600px' }}
                    centered={false}
                    closeIcon
                    size="large"
                    trigger={<Button primary icon labelPosition='left' onClick={this.handleCalendarOpen}><Icon name='clock' /><span style={{color:'white'}}>{this.state.fromDate.format("MMM Do YYYY") + " To " + this.state.toDate.format("MMM Do YYYY")}</span></Button>}
                    open={this.state.calendarModalOpen}
                    onClose={this.handleCalendarClose}>
                    <Modal.Header>Select a Time Range </Modal.Header>
                    <Modal.Content>
                        <Calendar fromDate={this.state.fromDate} toDate={this.state.toDate} onDateChangeHandler={this.dateSelected} />
                    </Modal.Content>
                </Modal>

                <div > Production Date: <b>03/11/2018</b></div>
            </div>
        );
    }
}