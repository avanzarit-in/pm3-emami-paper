import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import DataGridToolBar from './DataGridToolBar';
import $ from 'jquery'

const columns = [
    { key: "SLN", editable: false, headerRenderer: () => <div className="header-wrapper">SLN</div> },
    { key: "REELNO", editable: true, headerRenderer: () => <div  className="header-wrapper">REEL NO</div> },
    { key: "ITEMCODE", editable: false, headerRenderer: () => <div  className="header-wrapper">ITEM CODE</div> },
    { key: "WEIGHT", editable: true, headerRenderer: () => <div  className="header-wrapper"><div className="grouped-column">&nbsp;</div><div>WEIGHT(KG)</div></div> },
    { key: "JNT", editable: false, headerRenderer: () => <div  className="header-wrapper"><div className="grouped-column" >REEL/REAM</div><div>JNT</div></div> },
    { key: "BUNDLE", editable: false, headerRenderer: () => <div  className="header-wrapper"><div className="grouped-column">&nbsp;</div><div>BUNDLE</div></div> },
    { key: "SFT", editable: false, headerRenderer: () => <div  className="header-wrapper">SFT</div> },
    { key: "QLYMRK", editable: true, headerRenderer: () => <div  className="header-wrapper">QLY MRK</div> },
    { key: "PARENTRELNO", editable: true, headerRenderer: () => <div  className="header-wrapper"><div >PARENT</div><div>RL. NO.</div></div> },
    { key: "WEIGHTDATE", editable: false, headerRenderer: () => <div  className="header-wrapper"><div >WEIGHTMENT</div><div>DATE</div></div> },
    { key: "LENGTH", editable: true, headerRenderer: () => <div  className="header-wrapper">LENGTH</div> }
];

const rows = [
    { SLN: 0, REELNO: "", ITEMCODE: "5145904", WEIGHT: "", JNT: 0, BUNBLE: "", SFT: "A", QLYMRK: "A", PARENTRELNO: "", WEIGHTDATE: "03/11/2018", LENGTH: "" }
];


export default class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.rows = rows;
        //Intentionally kept at numberOfRows + 1
        //When the event selecteCell is fired based on the fact that the row is navigated with tabs 
        //e.changeRowOrColumn will evaluate to 'true' and we add a new Row into the rows collection
        this.state.totalRows = 2;
        this.state.browserZoomLevel = 100;
        this.state.refresh=true;
    }

    setZoom = () => {
        let _this = this;
        $(window).resize(function () {
            let that = this;
            var browserZoomLevel = Math.round(window.devicePixelRatio * 100);
            console.log(browserZoomLevel);
            _this.setState({ browserZoomLevel: browserZoomLevel });
        });
    }

    componentDidUpdate(){
        console.log("Component updated");
    //    this.setZoom();
     //  this.setState({refresh:!this.state.refresh})
      
    }
    componentDidMount() {
           $($.find(".react-grid-HeaderCell")[3]).css("z-index", "1");
        //   $($.find(".react-grid-HeaderCell")[4]).css("z-index", "1");
        //   $($.find(".react-grid-HeaderCell")[5]).css("z-index", "1");
        this.setZoom();
      

    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        console.log(fromRow + "," + toRow);
        console.log(updated);

        /** This is done to disable dragging the cell value and copying it to cells below it. I addition to this
         * check there is a css setting to hide the drag icon
         * .drag-handle { display: none; }
         */
        if (fromRow !== toRow) {
            return;
        }
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            return { rows };
        });
    };

    rowGetter = (i) => {
        return this.state.rows[i];
    }

    selectedCell = (e) => {
        //We only add a new row if the user is on the last visible row and tabs to move to the next row
        if (e.changeRowOrColumn && e.rowIdx + 1 === this.state.totalRows) {
            let rows = [...this.state.rows];
            rows.push({ SLN: this.state.totalRows - 1, REELNO: "", ITEMCODE: "5145904", WEIGHT: "", JNT: 0, BUNBLE: "", SFT: "A", QLYMRK: "A", PARENTRELNO: "", WEIGHTDATE: "03/11/2018", LENGTH: "" });
            this.setState({ rows: rows, totalRows: this.state.totalRows + 1 })
        }
    }

    headerRenderer = (e) => {
        console.log(e);
    }

    render() {
        console.log("rendering datagrid");
        return (
            <ReactDataGrid
         
                columns={columns}
                rowGetter={this.rowGetter}
                rowsCount={this.state.totalRows}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
                toolbar={<DataGridToolBar />}
                cellNavigationMode="changeRow"
                onCellSelected={this.selectedCell}
                //This had to be explicitly set to a value >=400 as without this the table grid render method was called infinitly
                minHeight={630}
                //This is done to scroll the table to the last row once a row is added 
                scrollToRowIndex={this.state.totalRows - 1}
                headerRowHeight={55}

            />
        );
    }
}