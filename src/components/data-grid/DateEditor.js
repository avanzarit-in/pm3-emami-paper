import React, { Component } from 'react';
import moment from 'moment'
import { Form, Grid, Input, Button, Icon, Modal } from 'semantic-ui-react';
import MonthCalendar from '../calendar/monthCalendar/MonthCalendar';
export default class DateEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {date : moment().format("DD/MM/YYYY")};
        this.state.showModal = false;

    }
    close = () => {
        this.setState({ showModal: false })
    }
    setDate = (e, date) => {
        console.log("date String =>" + date.format("DD/MM/YYYY"));
        this.setState({
            date : date.format("DD/MM/YYYY")
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
                               
                                <Form.Input fluid label='Date' placeholder='Date' >

                                    <Input action={<Button icon onClick={() => {
                                        this.setState({ showModal: true })

                                    }}>
                                        <Icon name='calendar alternate outline' />
                                    </Button>} placeholder='Date' value ={this.state.date}/>

                                </Form.Input>
                                
                               
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