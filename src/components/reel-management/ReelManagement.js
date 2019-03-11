import React, { Component } from 'react';
import DataGrid from './../data-grid/DataGrid';
import DataGridToolBar from './DataGridToolBar';
import { Dimmer, Loader } from 'semantic-ui-react';
import withDataServices from './../hoc/withDataServices';

/**const columns = [
    { key: "SLN", editable: false, headerRenderer: () => <div className="header-wrapper">SLN</div> },
    { key: "REELNO", editable: true, headerRenderer: () => <div className="header-wrapper">REEL NO</div> },
    { key: "ITEMCODE", editable: false, headerRenderer: () => <div className="header-wrapper">ITEM CODE</div> },
    { key: "WEIGHT", editable: true, headerRenderer: () => <div className="header-wrapper"><div className="grouped-column">&nbsp;</div><div>WEIGHT(KG)</div></div> },
    { key: "JNT", editable: false, headerRenderer: () => <div className="header-wrapper"><div className="grouped-column" >REEL/REAM</div><div>JNT</div></div> },
    { key: "BUNDLE", editable: false, headerRenderer: () => <div className="header-wrapper"><div className="grouped-column">&nbsp;</div><div>BUNDLE</div></div> },
    { key: "SFT", editable: false, headerRenderer: () => <div className="header-wrapper">SFT</div> },
    { key: "QLYMRK", editable: true, headerRenderer: () => <div className="header-wrapper">QLY MRK</div> },
    { key: "PARENTRELNO", editable: true, headerRenderer: () => <div className="header-wrapper"><div >PARENT</div><div>RL. NO.</div></div> },
    { key: "WEIGHTDATE", editable: false, headerRenderer: () => <div className="header-wrapper"><div >WEIGHTMENT</div><div>DATE</div></div> },
    { key: "LENGTH", editable: true, headerRenderer: () => <div className="header-wrapper">LENGTH</div> }
];
**/

const columns = [
    { key: "SLN", title: "SLN", mandatory: false,readOnly:true },
    { key: "REELNO", title: "REEL NO", mandatory: true  },
    { key: "ITEMCODE", title: "ITEM CODE", mandatory: true },
    { key: "WEIGHT", title: "WEIGHT(KG)", mandatory: true,groupTitle: ()=>{return(<div className="grouped-column" >&nbsp;</div>)} },
    { key: "JNT", title: "JNT", mandatory: true,groupTitle:()=>{return(<div className="grouped-column" >REEL/REAM</div>)} },
    { key: "BUNDLE", title: "BUNDLE", mandatory: true,groupTitle:()=>{return(<div className="grouped-column" >&nbsp;</div>)} },
    { key: "SFT", title: "SFT", mandatory: true },
    { key: "QLYMRK", title: "QLY MRK", mandatory: true },
    { key: "PARENTRELNO", title: "PARENT", mandatory: true},
    { key: "WEIGHTDATE", title: "WEIGHTMENT", mandatory: true },
    { key: "LENGTH", title: "LENGTH", mandatory: true }
];


class ReelManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.rows = [];
        this.state.isLoading = true;
    }
    createNewRow = (rowId) => {
        return new Promise((resolve, reject) => {
            this.props.reelMasterService.create({_id: rowId,"SLN":rowId, "REELNO":"","ITEMCODE":"", "WEIGHT":"","JNT":"", "BUNDLE":"", "SFT":"", "QLYMRK":"", "PARENTRELNO":"","WEIGHTDATE":"","LENGTH":""}).then(data => {
                resolve(data);
            })
        })
    }

    saveHook = (item) => {
        console.log(item);
        return new Promise((resolve, reject) => {
             
            if ( item.REELNO===""||item.ITEMCODE===""||item.WEIGHT===""||item.JNT===""||item.BUNDLE===""||item.SFT===""||item.QLYMRK===""||item.PARENTRELNO===""||item.WEIGHTDATE===""||item.LENGTH==="") {
                resolve(false);
            } else {
                this.props.reelMasterService.patch(item.ROWID, 
                { "REELNO":item.REELNO,"ITEMCODE":item.ITEMCODE, "WEIGHT":item.WEIGHT,"JNT":item.JNT, "BUNDLE":item.BUNDLE, "SFT":item.SFT, "QLYMRK":item.QLYMRK, "PARENTRELNO":item.PARENTRELNO,"WEIGHTDATE":item.WEIGHTDATE,"LENGTH":item.LENGTH })
                .then(patchedItem => {
                    resolve(true);
                })
            }
        })
    }

    componentDidMount() {
        this.props.reelMasterService.find().then(items => {
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

export default withDataServices(ReelManagement, ['reelMaster'], (reelMasterService) => ({
    reelMasterService: reelMasterService
}));
