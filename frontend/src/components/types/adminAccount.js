import renderCellExpand from "./renderCellExpand";

const adminAccountColumns = [
  { field: "id", headerName: "ID", width: 50, hide: true, renderCell: renderCellExpand, },
  { field: "firstName", headerName: "First Name", width: 150, renderCell: renderCellExpand, },
  { field: "lastName", headerName: "Last Name", width: 150, renderCell: renderCellExpand, },
  { field: "email", headerName: "Email", width: 200, renderCell: renderCellExpand, },
  { field: "remarks", headerName: "Remarks", width: 300, renderCell: renderCellExpand, },
  {
    field: "isSuper",
    headerName: "Is Special?",
    description: "A special admin can create and disable other admin accounts.",
    width: 180,
    type: "boolean",
  },
  {
    field: "isDisabled",
    headerName: "Is Disabled?",
    width: 180,
    type: "boolean",
  },
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

export default adminAccountColumns;
