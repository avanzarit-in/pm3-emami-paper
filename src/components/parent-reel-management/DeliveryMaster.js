import React, { Component } from 'react';
import DataGrid from './../data-grid/DataGrid';
import withDataServices from './../hoc/withDataServices';
import { Dimmer, Loader } from 'semantic-ui-react';

const columns = [

    { key: "CONSIGNEEID", title: "CONSIGNEE ID", mandatory: false,readOnly:true },
    { key: "COUNTRY", title: "COUNTRY", mandatory: true },
    { key: "REGION", title: "REGION", mandatory: true },
    { key: "PINCODE", title: "PIN CODE", mandatory: true },
  /*  { key: "ADDRESS", title: "ADDRESS", mandatory: true }*/

];

class DeliveryMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.rows = [];
        this.state.isLoading = true;
    }
    createNewRow = (rowId) => {
        return new Promise((resolve, reject) => {

            this.props.deliveryMasterService.create({ _id: rowId, COUNTRY: "", REGION: "", PINCODE: ""}).then(data => {

                resolve(data);
            })
        })
    }

    saveHook = (item) => {
        console.log(item);
        return new Promise((resolve, reject) => {

            if ( item.COUNTRY === "" || item.REGION === "" || item.PINCODE === "") {
                resolve(false);
            } else {
                this.props.deliveryMasterService.patch(item.ROWID, 
                { "COUNTRY": item.COUNTRY, "REGION": item.REGION, "PINCODE": item.PINCODE })

                .then(patchedItem => {
                    resolve(true);
                })
            }
        })
    }

    componentDidMount() {
        this.props.deliveryMasterService.find().then(items => {
            this.setState({ rows: items, isLoading: false });
        })
    }

    render() {
        return (
            !this.state.isLoading ? <
                DataGrid columns={columns} minHeight={467} createNewRowHandler={this.createNewRow} rows={this.state.rows} saveHook={(item) => this.saveHook(item)} /> :
                <Dimmer active inverted style={{ position: 'fixed', top: "50%" }}>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
        );
    }
}

export default withDataServices(DeliveryMaster, ['deliveryMaster'], (deliveryMasterService) => ({
    deliveryMasterService: deliveryMasterService
}));