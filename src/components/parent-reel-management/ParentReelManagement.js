import React, { Component } from 'react';
import DataGrid from './../data-grid/DataGrid';

const columns = [
    { key: "LOTNO", editable: true, headerRenderer: () => <div  className="header-wrapper">LOT NO.</div> },
    { key: "PARENTRLNO", editable: true, headerRenderer: () => <div  className="header-wrapper">PARENT REEL NO.</div> },
    { key: "MFGDATE", editable: true, headerRenderer: () => <div  className="header-wrapper">REEL MFG DATE.</div> },
    { key: "WEIGHT", editable: true, headerRenderer: () => <div  className="header-wrapper">PARENT ROLL WT</div> },
    
];

const rows = [
    { LOTNO: "", PARENTRLNO: "", MFGDATE: "", WEIGHT: "" }
];
export default class ParentReelManagement extends Component {
    createNewRow = () => {
        return { LOTNO: "", PARENTRLNO: "", MFGDATE: "", WEIGHT: "" }
    }
    render() {
        return (
            <DataGrid columns={columns} rows={rows} createNewRowHandler={this.createNewRow}/>
        );
    }
}