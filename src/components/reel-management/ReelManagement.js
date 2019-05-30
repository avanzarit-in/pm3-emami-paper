import React, { Component } from 'react';
import DataGrid from './../data-grid/DataGrid';
import DataGridToolBar from './DataGridToolBar';
import { Dimmer, Loader } from 'semantic-ui-react';
import withDataServices from './../hoc/withDataServices';
import { Editors,Formatters } from "react-data-grid-addons";
import DateFormatter from './DateFormatter';
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
const { DropDownEditor } = Editors;

const itemCodes = [
  { id: "item1", value: "ItemCode0001" },
  { id: "item2", value: "ItemCode0002" },
  { id: "item3", value: "ItemCode0003" }
];
const qualityMark = [
    { id: "qty1", value: "A" },
    { id: "aty2", value: "B" },
    { id: "qty3", value: "C" }
  ];
const ItemCodesEditor = <DropDownEditor options={itemCodes} />;
const QualityMarkEditor = <DropDownEditor options={qualityMark} />;


const columns = [
    { key: "SLN", title: "SLN", mandatory: false,readOnly:true,},
    { key: "REELNO", title: "REEL NO", mandatory: true  },
    { key: "ITEMCODE", title: "ITEM CODE", mandatory: true, editor : ItemCodesEditor },
    { key: "WEIGHT", title: "WEIGHT(KG)", mandatory: true,groupTitle: ()=>{return(<div className="grouped-column" >&nbsp;</div>)} },
    { key: "JNT", title: "JNT", mandatory: true, groupTitle:()=>{return(<div className="grouped-column" >REEL/REAM</div>)} },
    { key: "BUNDLE", title: "BUNDLE", mandatory: true,groupTitle:()=>{return(<div className="grouped-column" >&nbsp;</div>)} },
    { key: "SFT", title: "SFT", mandatory: true },
    { key: "QLYMRK", title: "QLT MRK", mandatory: true,editor : QualityMarkEditor },
    { key: "PARENTRELNO", title: "PARENT REEL", mandatory: true},
    { key: "WEIGHTDATE", title: "WEIGHTDATE", mandatory: true,formatter : DateFormatter },
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
