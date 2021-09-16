import renderCellExpand from "./renderCellExpand";

const categoryColumns = [
  { field: "id", headerName: "ID", width: 100, renderCell: renderCellExpand, },
  { field: "parent_id", headerName: "Parent ID", width: 150, renderCell: renderCellExpand, },
  { field: "name", headerName: "Name", width: 150, renderCell: renderCellExpand, },
  { field: "imageURL", headerName: "Image URL", width: 200, hide: true, renderCell: renderCellExpand, },
  { field: "path", headerName: "Path", width: 200, hide: true, renderCell: renderCellExpand, },
  { field: "fullname", headerName: "Full Name", width: 300, renderCell: renderCellExpand, },
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

export default categoryColumns;
