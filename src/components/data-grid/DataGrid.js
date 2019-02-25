import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import $ from 'jquery'

export default class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.rows = props.rows;
        //Intentionally kept at numberOfRows + 1
        //When the event selecteCell is fired based on the fact that the row is navigated with tabs 
        //e.changeRowOrColumn will evaluate to 'true' and we add a new Row into the rows collection
        this.state.totalRows = 2;
        this.state.refresh = true;
    }

    componentDidMount() {
        $($.find(".react-grid-HeaderCell")[3]).css("z-index", "1");
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
            rows.push(this.props.createNewRowHandler(this.state.totalRows - 1));
            this.setState({ rows: rows, totalRows: this.state.totalRows + 1 })
        }
    }

    headerRenderer = (e) => {
        console.log(e);
    }

    render() {
        return (
            <ReactDataGrid
                columns={this.props.columns}
                rowGetter={this.rowGetter}
                rowsCount={this.state.totalRows}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
                toolbar={this.props.children}
                cellNavigationMode="changeRow"
                onCellSelected={this.selectedCell}
                //This had to be explicitly set to a value >=400 as without this the table grid render method was called infinitly
                minHeight={630}
                //This is done to scroll the table to the last row once a row is added 
                scrollToRowIndex={this.state.totalRows - 1}
                headerRowHeight={this.props.headerRowHeight}
            />
        );
    }
}