import React, { Component } from 'react';
import moment from 'moment'
import { Form, Grid, Input, Button, Icon, Modal } from 'semantic-ui-react';
import MonthCalendar from '../calendar/monthCalendar/MonthCalendar';
export default class DataGridToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.showModal = false;

    }
    close = () => {
        this.setState({ showModal: false })
    }
    setDate = (e, date) => {
        console.log("date String =>" + date.format("YYYY/MM/DD"));
        this.close();
    }
    render() {
        return (
            <Grid padded>
              
                        
                <Modal open={this.state.showModal} size='tiny' closeOnEscape={true}
                    closeOnDimmerClick={true} centered={false} onClose={this.close}>
                    <Modal.Header>Select Date</Modal.Header>
                    <Modal.Content >
                        <MonthCalendar date={moment()} callback={this.setDate} />
                    </Modal.Content>

                </Modal>
            </Grid>

        );
    }
}