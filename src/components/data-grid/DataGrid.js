import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import $ from 'jquery'
import { toast } from 'react-semantic-toasts';

export default class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.rows = [];
        this.state.columns = [];
        //Intentionally kept at numberOfRows + 1
        //When the event selecteCell is fired based on the fact that the row is navigated with tabs 
        //e.changeRowOrColumn will evaluate to 'true' and we add a new Row into the rows collection
        this.state.totalRows = 2;
        this.state.refresh = true;
        this.state.cellNavigationMode = 'changeRow';
        this.state.hasErrors = false;
        this.state.mandatoryColumns = [];
         this.state.notEditableColumns = [];
         this.state.currentColIndex=-1;
        this.state.isScrolling = false;
    }

    isEditable = (data) => {
        console.log(data);
        if ((data === undefined || data.ROWID === data.TOTALROWS) && this.state.notEditableColumns.indexOf(this.state.currentColIndex)===-1) {
            return true;
        } else {
            return false;
        }
    }

    setRowColor = (rowId, colId, changeInRow) => {
        console.log("In set row color");
        console.log(this.state.totalRows);
        if (rowId === this.state.totalRows - 2) {
            console.log("Editing the last row")
            let allRows = $.find(".react-grid-Row");
            let lastRow = allRows[allRows.length - 1];
            let cells = $(lastRow).find('.react-grid-Cell');
            cells.toArray().forEach((cell, index) => {

                if (this.state.mandatoryColumns.indexOf(index) >= 0 && Object.values(this.state.rows[rowId])[index + 1] === "") {
                    $(cell).css('background-color', '#ffb2b2');
                } else {
                    $(cell).css('background-color', '');
                }
            })
        }
    }

    componentDidUpdate() {

       // $($.find(".react-grid-HeaderCell")[3]).css("z-index", "1");
        //If the table rows do not fit the height of the table the component hides the rows and isScrolling is set to true
        if (!this.state.isScrolling) {
            console.log("In component did update")
            let allRows = $.find(".react-grid-Row");
            allRows.forEach((eachRow, rowIndex) => {
                if (rowIndex === allRows.length - 1) {
                    let cells = $(eachRow).find('.react-grid-Cell');
                    cells.toArray().forEach((cell, index) => {
                        console.log(Object.values(this.state.rows[rowIndex])[index + 1]);
                        if (this.state.mandatoryColumns.indexOf(index) >= 0 && Object.values(this.state.rows[rowIndex])[index + 1] === "") {
                            $(cell).css('background-color', '#ffb2b2');
                        } else {
                            $(cell).css('background-color', '');
                        }
                    })
                } else {
                    let cells = $(eachRow).find('.react-grid-Cell');
                    cells.toArray().forEach((cell) => {
                        $(cell).css('background-color', '');
                    })
                }
            })
        }
    }

    componentDidMount() {
        let mandatoryColumns = [];
        let notEditableColumns=[];
        let columns = this.props.columns.map((column, index) => {
            if (column.mandatory) {
                mandatoryColumns.push(index);
            }
            if(column.readOnly!==undefined && column.readOnly){
                notEditableColumns.push(index);
            }
            return { key: column.key, editable: (data) => this.isEditable(data), headerRenderer: () => <div className="header-wrapper">{column.groupTitle!==undefined?<div className="grouped-column" >{column.groupTitle}</div>:null}{column.title}{column.mandatory ? <span style={{ color: 'red' }}>*</span> : ""}</div> }
        });

        if (this.props.rows.length === 0) {
            console.log("creating the first item")
            this.props.createNewRowHandler(1).then(row => {
                row["ROWID"] = 1;
                row["TOTALROWS"] = 1;
                let rows = [];
                rows.push(row);
                this.setState({ notEditableColumns:notEditableColumns,mandatoryColumns: mandatoryColumns, columns: columns, rows: rows });
            });

        } else {
            console.log("populating items from database")
            let rows = this.props.rows.map(row => {
                row.ROWID = row._id;
                row.TOTALROWS = this.props.rows.length;
                return row;
            })

            this.setState({ notEditableColumns:notEditableColumns,mandatoryColumns, mandatoryColumns, columns: columns, rows: rows, totalRows: rows.length + 1 });
        }


    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        //   console.log(fromRow + "," + toRow);
        //   console.log(updated);

        /** This is done to disable dragging the cell value and copying it to cells below it. I addition to this
         * check there is a css setting to hide the drag icon
         * .drag-handle { display: none; }
         */
        if (fromRow !== toRow) {
            return;
        }

        this.setState(state => {
            //       console.log(state.rows);
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
        //   console.log(e.rowIdx + "," + e.idx)
        console.log(e.idx);
        this.setRowColor(e.rowIdx, e.idx, e.changeRowOrColumn);
        if (e.changeRowOrColumn && (e.rowIdx + 1 === this.state.totalRows)) {
            this.props.saveHook(this.state.rows[e.rowIdx - 1]).then(success => {
                if (success) {
                    let rows = [...this.state.rows];
                    let rowItem = this.props.createNewRowHandler(this.state.totalRows).then(rowItem => {
                        rowItem["ROWID"] = this.state.totalRows;
                        rows.push(rowItem);
                        rows = rows.map(row => {
                            row.TOTALROWS = this.state.totalRows;
                            return row;
                        })
                        this.setState({ "currentColIndex":e.idx,rows: rows, totalRows: this.state.totalRows + 1, hasErrors: false })
                    });

                } else {
                    this.setState({ hasErrors: true,"currentColIndex":e.idx }, () => {
                        toast({
                            type: 'error',
                            icon: false,
                            title: 'Mandatory check failed.',
                            description: 'Please fill in all mandatory fields to proceed!!!',
                            time: 2000
                        });
                    });
                }
            })
        }else{
            this.setState({"currentColIndex":e.idx});
        }

    }

    onScrollAction = (e) => {
        console.log("in scroll");
        console.log(e.rowVisibleEndIdx + "," + this.state.totalRows);
        let allRows = $.find(".react-grid-Row");
        allRows.forEach((eachRow, rowIndex) => {
            let cells = $(eachRow).find('.react-grid-Cell')
            cells.toArray().forEach((cell, index) => {
                $(cell).css('background-color', '');
            })
        });
        if (e.rowVisibleEndIdx === this.state.totalRows) {
            let cells = $(allRows[allRows.length - 1]).find('.react-grid-Cell')
            cells.toArray().forEach((cell, index) => {
                if (this.state.mandatoryColumns.indexOf(index) >= 0 && Object.values(this.state.rows[this.state.totalRows - 2])[index + 1] === "") {
                    $(cell).css('background-color', '#ffb2b2');
                } else {
                    $(cell).css('background-color', '');
                }
            })
        }
    }

    onScroll = (e) => {
        this.setState({ isScrolling: true }, () => this.onScrollAction(e));
    }

    render() {
        return (
            <ReactDataGrid
                columns={this.state.columns}
                rowGetter={this.rowGetter}
                rowsCount={this.state.totalRows}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
                toolbar={this.props.children}
                cellNavigationMode={this.state.cellNavigationMode}
                onCellSelected={this.selectedCell}
                //This had to be explicitly set to a value >=400 as without this the table grid render method was called infinitly
                minHeight={470}
                //This is done to scroll the table to the last row once a row is added 
                scrollToRowIndex={this.state.totalRows - 1}
                headerRowHeight={this.props.headerRowHeight}
                onScroll={this.onScroll}
            />
        );
    }
}