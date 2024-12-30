import DynamicTable from "../../utils/DynamicTable";

const DynamicAgTable = () => {
  const columns = [
    { field: "name", headerName: "Name" },
    { field: "age", headerName: "Age" },
    { field: "city", headerName: "City" },
  ];

  const rows = [
    { name: "John Doe", age: 25, city: "New York" },
    { name: "Jane Smith", age: 30, city: "Los Angeles" },
    { name: "Mark Johnson", age: 35, city: "Chicago" },
  ];

  return (
    <div style={{ margin: 20 }}>
      <h1>Dynamic ag-Grid Table</h1>
      <DynamicTable columnDefs={columns} rowData={rows} />
    </div>
  );
};

export default DynamicAgTable;
