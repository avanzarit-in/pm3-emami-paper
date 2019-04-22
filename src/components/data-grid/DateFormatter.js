import React, { Component } from 'react';
import { Form, Button, Input, Icon } from 'semantic-ui-react';


export default class DateFormatter extends Component {
    render() {
        return (
            <Form >
                <Form.Group widths='equal'>
                    
                    <Form.Input fluid label='Date' placeholder='Date' >

                        <Input action={<Button icon onClick={() => {
                            this.setState({ showModal: true })

                        }}>
                            <Icon name='calendar alternate outline' />
                        </Button>} placeholder='Date' />

                    </Form.Input>
                </Form.Group>
            </Form>

        );


    }
}