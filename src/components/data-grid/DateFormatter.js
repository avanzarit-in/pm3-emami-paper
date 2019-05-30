import React, { Component } from 'react';
import moment from 'moment'
import { Input, Button, Icon, Modal } from 'semantic-ui-react';
import MonthCalendar from '../calendar/monthCalendar/MonthCalendar';
import { Border } from 'devextreme-react/sankey';
export default class DateFormatter extends Component {
    constructor(props) {
        super(props);
        this.state = { date: moment().format("DD/MM/YYYY") };
        this.state.showModal = false;

    }
    close = () => {
        this.setState({ showModal: false })
    }
    setDate = (e, date) => {
        console.log("date String =>" + date.format("DD/MM/YYYY"));
        this.setState({
            date: date.format("DD/MM/YYYY")
        });
        this.close();
    }
    render() {
        return (
            <div>
                <Input transparent fluid size = "small" action={<Button icon onClick={() => {
                    this.setState({ showModal: true })

                }}>
                    <Icon  name='calendar alternate outline' />
                </Button>} placeholder='Date' value={this.state.date} />
                <Modal open={this.state.showModal} size='tiny' closeOnEscape={true}
                    closeOnDimmerClick={true} centered={false} onClose={this.close}>
                    <Modal.Header>Select Date</Modal.Header>
                    <Modal.Content >
                        <MonthCalendar date={moment()} callback={this.setDate} />
                    </Modal.Content>

                </Modal>
            </div>

        );
    }
}