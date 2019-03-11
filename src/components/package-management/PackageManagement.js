import React, { Component } from 'react';
import DataGrid from './../data-grid/DataGrid';
import DataGridToolBar from './DataGridToolBar';
import { Dimmer, Loader } from 'semantic-ui-react';
import withDataServices from './../hoc/withDataServices';


const columns = [
    { key: "SLN", title: "SLN", mandatory: false,readOnly:true },
    { key: "LOTNO", title: "LOT NO", mandatory: true  },
    { key: "REELNO", title: "REEL NO", mandatory: true,groupTitle: ()=>{return(<div  className="grouped-column" >&nbsp;</div>)} },
    { key: "WEIGHT", title: "WEIGHT(KG)", mandatory: true,groupTitle: ()=>{return(<div style={{marginLeft:'-170px'}} className="grouped-column" >REAL/RIM</div>)} },
    { key: "QLTMRK", title: "QLT MRK", mandatory: true},
    { key: "ITEMCODE", title: "ITEM CODE", mandatory: true},
    { key: "ITEMNAME", title: "ITEM NAME", mandatory: true },
    { key: "GSM", title: "GSM", mandatory: true },
    { key: "SIZE", title: "SIZE", mandatory: true},
];


class PackageManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.rows = [];
        this.state.isLoading = true;
    }
    createNewRow = (rowId) => {
        return new Promise((resolve, reject) => {
            this.props.packageMasterService.create({_id: rowId,"SLN":rowId, "LOTNO":"","REELNO":"", "WEIGHT":"","QLTMRK":"", "ITEMCODE":"", "ITEMNAME":"", "GSM":"", "SIZE":""}).then(data => {
                resolve(data);
            })
        })
    }

    saveHook = (item) => {
        console.log(item);
        return new Promise((resolve, reject) => {
             
            if ( item.LOTNO===""||item.REELNO===""||item.WEIGHT===""||item.QLTMRK===""||item.ITEMCODE===""||item.ITEMNAME===""||item.GSM===""||item.SIZE==="") {
                resolve(false);
            } else {
                this.props.packageMasterService.patch(item.ROWID, 
                { "LOTNO":item.LOTNO,"REELNO":item.REELNO, "WEIGHT":item.WEIGHT,"QLTMRK":item.QLTMRK, "ITEMCODE":item.ITEMCODE, "ITEMNAME":item.ITEMNAME, "GSM":item.GSM, "SIZE":item.SIZE })
                .then(patchedItem => {
                    resolve(true);
                })
            }
        })
    }

    componentDidMount() {
        this.props.packageMasterService.find().then(items => {
            this.setState({ rows: items, isLoading: false });
        })
    }

    render() {
        return (
            !this.state.isLoading ? 
            <DataGrid headerRowHeight={50} minHeight={477} columns={columns} createNewRowHandler={this.createNewRow} rows={this.state.rows} saveHook={(item) => this.saveHook(item)} >
            <DataGridToolBar/>
            </DataGrid> :
                <Dimmer active inverted style={{ position: 'fixed', top: "50%" }}>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
        );
    }
}

export default withDataServices(PackageManagement, ['packageMaster'], (packageMasterService) => ({
    packageMasterService: packageMasterService
}));
