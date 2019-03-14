import React, { Component } from 'react';
import DataGrid from './../data-grid/DataGrid';
import withDataServices from './../hoc/withDataServices';
import { Dimmer, Loader } from 'semantic-ui-react';

const columns = [
    { key: "PRODUCTNO", title: "PRODUCT NO.", mandatory: true },
    { key: "PRODUCTNAME", title: "PRODUCT NAME", mandatory: true },
    { key: "GSM", title: "GSM", mandatory: true },
    { key: "SIZE", title: "SIZE", mandatory: true },
    { key: "WEIGHT", title: "WEIGHT", mandatory: true }
];

class ProductMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.rows = [];
        this.state.isLoading = true;
    }
    createNewRow = (rowId) => {
        return new Promise((resolve, reject) => {
            this.props.productMasterService.create({ _id: rowId, PRODUCTNO: "", PRODUCTNAME: "", GSM: "", SIZE: "" ,WEIGHT:""}).then(data => {
                resolve(data);
            })
        })
    }

    saveHook = (item) => {
        console.log(item);
        return new Promise((resolve, reject) => {
            if ( item.PRODUCTNO === "" || item.PRODUCTNAME === "" || item.GSM === ""|| item.SIZE === ""|| item.WEIGHT === "") {
                resolve(false);
            } else {
                this.props.productMasterService.patch(item.ROWID, 
                { "PRODUCTNO": item.PRODUCTNO, "PRODUCTNAME": item.PRODUCTNAME, "GSM": item.GSM, "SIZE": item.SIZE,"WEIGHT": item.WEIGHT })
                .then(patchedItem => {
                    resolve(true);
                })
            }
        })
    }

    componentDidMount() {
        this.props.productMasterService.find().then(items => {
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

export default withDataServices(ProductMaster, ['productMaster'], (productMasterService) => ({
    productMasterService: productMasterService
}));