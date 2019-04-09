import React, { Component } from 'react';
import DataGrid from './../data-grid/DataGrid';
import withDataServices from './../hoc/withDataServices';
import { Dimmer, Loader } from 'semantic-ui-react';

const columns = [
    { key: "LOTNO", title: "LOT NO", mandatory: false,readOnly:true },
    { key: "PARENTRLNO", title: "PARENT REEL NO", mandatory: true },
    { key: "MFGDATE", title: "REEL MFG DATE", mandatory: true, editable : true },
    { key: "WEIGHT", title: "PARENT ROLL WT", mandatory: true }
];

class ParentReelManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.rows = [];
        this.state.isLoading = true;
    }
    createNewRow = (rowId) => {
        return new Promise((resolve, reject) => {
            this.props.parentReelMasterService.create({ _id: rowId, LOTNO: "", PARENTRLNO: "", MFGDATE: "", WEIGHT: "" }).then(data => {
                resolve(data);
            })
        })
    }

    saveHook = (item) => {
        console.log(item);
        return new Promise((resolve, reject) => {
            if ( item.PARENTRLNO === "" || item.MFGDATE === "" || item.WEIGHT === "") {
                resolve(false);
            } else {
                this.props.parentReelMasterService.patch(item.ROWID, 
                { "LOTNO": item.LOTNO, "PARENTRLNO": item.PARENTRLNO, "MFGDATE": item.MFGDATE, "WEIGHT": item.WEIGHT })
                .then(patchedItem => {
                    resolve(true);
                })
            }
        })
    }

    componentDidMount() {
        this.props.parentReelMasterService.find().then(items => {
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

export default withDataServices(ParentReelManagement, ['parentReelMaster'], (parentReelMasterService) => ({
    parentReelMasterService: parentReelMasterService
}));