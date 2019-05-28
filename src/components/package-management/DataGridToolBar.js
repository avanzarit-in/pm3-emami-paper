import React, { Component } from 'react';
import moment from 'moment'
import { Form, Grid, Input, Button, Icon, Modal,Dropdown} from 'semantic-ui-react';
import MonthCalendar from '../calendar/monthCalendar/MonthCalendar';


const options = [
    { key: 1, text: 'CosigneeName1', value: 1 },
    { key: 2, text: 'CosigneeName2', value: 2 },
    { key: 3, text: 'CosigneeName3', value: 3 },
  ];
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
                                {/*<Form.Input fluid label='Date' placeholder='Date' >

                                    <Input action={<Button icon onClick={() => {
                                        this.setState({ showModal: true })

                                    }}>
                                        <Icon name='calendar alternate outline' />
                                    </Button>} placeholder='Date' value ={this.state.date}/>

                                </Form.Input>*/}
                                <Form.Input fluid label='Truck No.' placeholder='Last name' />
                                <Form.Input fluid label='Consignee Name'><Dropdown  placeholder='Consignee Name  '   options={options} selection /></Form.Input>
                               

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