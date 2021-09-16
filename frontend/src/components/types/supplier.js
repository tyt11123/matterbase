import renderCellExpand from "./renderCellExpand";

const supplierColumns = [
  { field: "id", headerName: "ID", width: 50, hide: true, renderCell: renderCellExpand, },
  { field: "firstName", headerName: "First Name", width: 150, renderCell: renderCellExpand, },
  { field: "lastName", headerName: "Last Name", width: 150, renderCell: renderCellExpand, },
  { field: "email", headerName: "Email", width: 200, renderCell: renderCellExpand, },
  { field: "telephone", headerName: "Telephone", width: 150, renderCell: renderCellExpand, },
  { field: "companyName", headerName: "Company Name", width: 250, renderCell: renderCellExpand, },
  { field: "companyType", headerName: "Company Type", width: 200, renderCell: renderCellExpand, },
  { field: "jobTitle", headerName: "Job Title", width: 150, renderCell: renderCellExpand, },
  { field: "country", headerName: "Country", width: 150, renderCell: renderCellExpand, },
  { field: "companyLocation", headerName: "Company Location", width: 200, renderCell: renderCellExpand, },
  { field: "companyWebsite", headerName: "Company Website", width: 200, renderCell: renderCellExpand, },
  {
    field: "isAgency",
    headerName: "Is Agency?",
    width: 180,
    type: "boolean",
  },
  {
    field: "isManufacturer",
    headerName: "Is Manufacturer?",
    width: 220,
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

export default supplierColumns;
