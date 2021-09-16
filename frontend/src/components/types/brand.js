import renderCellExpand from "./renderCellExpand";

const brandColumns = [
  { field: "id", headerName: "ID", width: 50, hide: true, renderCell: renderCellExpand, },
  { field: "name", headerName: "Name", width: 200, renderCell: renderCellExpand, },
  { field: "country", headerName: "Country", width: 150, renderCell: renderCellExpand, },
  { field: "website", headerName: "Website", width: 200, renderCell: renderCellExpand, },
  { field: "supplier", headerName: "Supplier", width: 250, renderCell: renderCellExpand, },
  { field: "leftIntro", headerName: "Introduction (Left)", width: 250, renderCell: renderCellExpand, },
  { field: "rightIntro", headerName: "Introduction (Right)", width: 250, renderCell: renderCellExpand, },
  {
    field: "isSupplier",
    headerName: "Is Supplier?",
    width: 180,
    type: "boolean",
  },
  {
    field: "isHKOffice",
    headerName: "Is Office in H.K.?",
    width: 220,
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

export default brandColumns;
