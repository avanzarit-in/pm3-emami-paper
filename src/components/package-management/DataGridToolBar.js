import React, { Component } from 'react';
import moment from 'moment'
import { Form, Grid, Input, Button, Icon, Modal } from 'semantic-ui-react';
import MonthCalendar from '../calendar/monthCalendar/MonthCalendar';
export default class DataGridToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {date : moment().format("YYYY/MM/DD")};
        this.state.showModal = false;

    }
    close = () => {
        this.setState({ showModal: false })
    }
    setDate = (e, date) => {
        console.log("date String =>" + date.format("YYYY/MM/DD"));
        this.setState({
            date : date.format("YYYY/MM/DD")
            });
        this.close();
    }
    render() {
        return (
            <Grid padded>
                <Grid.Row style={{padding:'0px'}}>
                    <Grid.Column>
                        <Form >
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Slip No.' placeholder='First name' />
                                <Form.Input fluid label='Date' placeholder='Date' >

                                    <Input action={<Button icon onClick={() => {
                                        this.setState({ showModal: true })

                                    }}>
                                        <Icon name='calendar alternate outline' />
                                    </Button>} placeholder='Date' value ={this.state.date}/>

                                </Form.Input>
                                <Form.Input fluid label='Challan No.' placeholder='Last name' />
                                <Form.Input fluid label='Date' placeholder='Date' >

                                    <Input action={<Button icon onClick={() => {
                                        this.setState({ showModal: true })

                                    }}>
                                        <Icon name='calendar alternate outline' />
                                    </Button>} placeholder='Date' value ={this.state.date}/>

                                </Form.Input>
                                <Form.Input fluid label='Truck No.' placeholder='Last name' />

                            </Form.Group>
                        </Form>


                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{padding:'0px'}}>
                    <Grid.Column>
                        <Form >
                            <Form.Group >
                                <Form.Input fluid label='Consignee Name' placeholder='Consignee Name' width={6}/>
                               
                            </Form.Group>
                        </Form>


                    </Grid.Column>
                </Grid.Row>
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