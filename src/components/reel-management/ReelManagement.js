import React, { Component } from 'react';
import DataGrid from './../data-grid/DataGrid';
import DataGridToolBar from './DataGridToolBar';
const columns = [
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

const rows = [
    { SLN: 0, REELNO: "", ITEMCODE: "5145904", WEIGHT: "", JNT: 0, BUNBLE: "", SFT: "A", QLYMRK: "A", PARENTRELNO: "", WEIGHTDATE: "03/11/2018", LENGTH: "" }
];
export default class ReelManagement extends Component {
    createNewRow = (rowId) => {
        return { SLN: rowId, REELNO: "", ITEMCODE: "5145904", WEIGHT: "", JNT: 0, BUNBLE: "", SFT: "A", QLYMRK: "A", PARENTRELNO: "", WEIGHTDATE: "03/11/2018", LENGTH: "" }
    }
    render() {
        return (
            <DataGrid columns={columns} rows={rows} headerRowHeight={55} createNewRowHandler={(rowId)=>this.createNewRow(rowId)}>
                <DataGridToolBar />
            </DataGrid>
        );
    }
}