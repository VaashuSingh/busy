import "./Table.css";
import { useState, useRef } from "react";

const EditableTable = () => {
  const [data, setData] = useState([
    { name: "John", age: 30, initial: "J" },
    { name: "Jane", age: 25, initial: "A" },
  ]);

  const [editingCell, setEditingCell] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleCellDoubleClick = (rowIndex, colKey, value) => {
    setEditingCell({ rowIndex, colKey });
    setInputValue(value);
    setTimeout(() => inputRef.current.focus(), 0); // Focus on input
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const saveEdit = () => {
    if (editingCell) {
      const { rowIndex, colKey } = editingCell;
      const updatedData = [...data];
      const cellType =
        colKey === "age"
          ? "number"
          : colKey === "initial"
          ? "single"
          : "string";

      // Validate input
      if (cellType === "number" && isNaN(inputValue)) {
        alert("Please enter a valid number!");
        return;
      }
      if (cellType === "single" && inputValue.length > 1) {
        alert("Please enter a single character!");
        return;
      }

      updatedData[rowIndex][colKey] =
        colKey === "age" ? Number(inputValue) : inputValue;
      setData(updatedData);
      setEditingCell(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEdit();

      // Move to the next cell
      const { rowIndex, colKey } = editingCell;
      const columnKeys = Object.keys(data[0]);
      const nextColIndex = columnKeys.indexOf(colKey) + 1;

      if (nextColIndex < columnKeys.length) {
        handleCellDoubleClick(
          rowIndex,
          columnKeys[nextColIndex],
          data[rowIndex][columnKeys[nextColIndex]]
        );
      } else if (rowIndex + 1 < data.length) {
        handleCellDoubleClick(
          rowIndex + 1,
          columnKeys[0],
          data[rowIndex + 1][columnKeys[0]]
        );
      }
    }
  };

  return (
    <div>
      <h1>Editable Table with React</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Initial</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.entries(row).map(([colKey, value]) => (
                <td
                  key={colKey}
                  onDoubleClick={() =>
                    handleCellDoubleClick(rowIndex, colKey, value)
                  }
                >
                  {editingCell &&
                  editingCell.rowIndex === rowIndex &&
                  editingCell.colKey === colKey ? (
                    <input
                      ref={inputRef}
                      type={colKey === "age" ? "number" : "text"}
                      value={inputValue}
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
