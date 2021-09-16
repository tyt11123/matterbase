import renderCellExpand from "./renderCellExpand";

const companyTypeColumns = [
  { field: "id", headerName: "ID", width: 50, hide: true, renderCell: renderCellExpand, },
  { field: "name", headerName: "Name", width: 300, renderCell: renderCellExpand, },
  {
    field: "created_at",
    headerName: "Created On",
    width: 180,
    type: "dateTime",
    renderCell: renderCellExpand,
  },
  {
    field: "updated_at",
    headerName: "Updated On",
    width: 180,
    type: "dateTime",
    renderCell: renderCellExpand,
  },
];

export default companyTypeColumns;
