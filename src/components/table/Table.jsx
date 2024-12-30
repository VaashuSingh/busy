import "./Table.css";

import { useState, useRef } from "react";

const EditableTable = () => {
  const [data, setData] = useState([
    { sn: 1, item: "test1", qty: 100, unit: "pcs", price: 10, amount: 1000 },
    { sn: 2, item: "test2", qty: 200, unit: "pcs", price: 20, amount: 2000 },
    { sn: 3, item: "test3", qty: 300, unit: "pcs", price: 30, amount: 3000 },
    { sn: 4, item: "test4", qty: 400, unit: "pcs", price: 40, amount: 4000 },
    { sn: 5, item: "test5", qty: 500, unit: "pcs", price: 50, amount: 5000 },
    { sn: 6, item: "test6", qty: 600, unit: "pcs", price: 60, amount: 6000 },
  ]);

  const [editingCell, setEditingCell] = useState(null); // Tracks the cell being edited
  const inputRef = useRef(null); // For input focus

  const handleCellClick = (rowIndex, colKey) => {
    setEditingCell({ rowIndex, colKey });
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[editingCell.rowIndex][editingCell.colKey] = value;
      return updatedData;
    });
  };

  const saveEdit = () => {
    setEditingCell(null); // Exit edit mode
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEdit();

      // Navigate to the next cell
      const { rowIndex, colKey } = editingCell;
      const columnKeys = Object.keys(data[0]);
      const nextColIndex = columnKeys.indexOf(colKey) + 1;

      if (nextColIndex < columnKeys.length) {
        handleCellClick(rowIndex, columnKeys[nextColIndex]);
      } else if (rowIndex + 1 < data.length) {
        handleCellClick(rowIndex + 1, columnKeys[0]);
      }
    }
  };

  const getCellStyle = (rowIndex, colKey) => {
    if (
      editingCell &&
      editingCell.rowIndex === rowIndex &&
      editingCell.colKey === colKey
    ) {
      return { backgroundColor: "#f0f8ff", cursor: "text" }; // Highlight style
    }
    return { cursor: "pointer" };
  };

  return (
    <div>
      <h1>Editable Table</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead style={{ background: "gray" }}>
          <tr>
            <th style={{ background: "gray" }}>S.N.</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.entries(row).map(([colKey, value]) => (
                <td
                  key={colKey}
                  style={getCellStyle(rowIndex, colKey)}
                  onClick={() => handleCellClick(rowIndex, colKey)}
                >
                  {editingCell &&
                  editingCell.rowIndex === rowIndex &&
                  editingCell.colKey === colKey ? (
                    <input
                      ref={inputRef}
                      type={colKey === "age" ? "number" : "text"}
                      value={value}
                      onChange={handleInputChange}
                      onBlur={saveEdit}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
