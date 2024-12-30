import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const DynamicTable = ({ columnDefs, rowData }) => {
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleKeyDown = (params) => {
    if (params.event.key === "Enter") {
      const nextCell = params.api.tabToNextCell(params);

      if (nextCell) {
        setTimeout(() => {
          params.api.startEditingCell({
            rowIndex: nextCell.rowIndex,
            colKey: nextCell.column.getId(),
          });
        });
      }
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        rowData={rowData}
        onCellKeyDown={handleKeyDown}
        defaultColDef={{
          editable: true, // Make all columns editable by default
          resizable: true,
          sortable: true,
          flex: 1,
        }}
      />
    </div>
  );
};


