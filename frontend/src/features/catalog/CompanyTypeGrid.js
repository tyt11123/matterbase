import React, { useState, useEffect } from "react";
import companyTypeColumns from "../../components/types/companyType";
import CatalogCreateCompanyType from "./CatalogCreateCompanyType";
import CatalogManageCompanyType from "./CatalogManageCompanyType";
import { useSelector, useDispatch } from "react-redux";
import {
  catalogListCompanyType,
  selectCatalogCreateCompanyType,
  selectCatalogListCompanyType,
  selectCatalogManageCompanyType,
} from "./catalogAsyncThunk";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  dataGrid: {
    height: 400,
    width: "100%",
  },
  dataGridFlex: {
    display: "flex",
    height: "100%",
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function CompanyTypeGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [companyTypeList, setCompanyTypeList] = useState([]);
  const [editButtonProps, setEditButtonProps] = useState({
    isSelected: false,
    data: {
      id: 0,
      name: "",
      created_at: new Date(),
      updated_at: new Date(),
    }
  });
  const catalogListCompanyTypeStore = useSelector(selectCatalogListCompanyType);
  const { payload } = catalogListCompanyTypeStore;
  const catalogManageCompanyTypeStore = useSelector(selectCatalogManageCompanyType);
  const { isSuccess: catalogManageCompanyTypeSuccess } = catalogManageCompanyTypeStore;
  const catalogCreateCompanyTypeStore = useSelector(selectCatalogCreateCompanyType);
  const { isSuccess: catalogCreateCompanyTypeSuccess } = catalogCreateCompanyTypeStore;
  
  const handleSelection = (selected) => {
    if (selected[0]) {
      const index = companyTypeList.findIndex(x => x.id === selected[0]);
      setEditButtonProps({ isSelected: true, data: { ...companyTypeList[index] } });
    } else {
      setEditButtonProps({
        isSelected: false,
        data: {
          id: 0,
          name: "",
          created_at: new Date(),
          updated_at: new Date(),
        }
      });
    };
  };

  useEffect(() => {
    dispatch(catalogListCompanyType());
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogManageCompanyTypeSuccess, catalogCreateCompanyTypeSuccess]);

  useEffect(() => {
    let companyType = [...payload];
    let list = [];
    if (companyType.length > 0) {
      for (let i = 0; i < companyType.length; i++) {
        let item = {
          ...companyType[i],
          created_at: new Date(companyType[i].created_at),
          updated_at: new Date(companyType[i].updated_at),
        }
        list.push(item);
      };
      setCompanyTypeList(list);
    };
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <Box className={classes.root}>
      <Typography>Company Type Management</Typography>
      <CatalogCreateCompanyType />
      {
        companyTypeList[0] &&
        <CatalogManageCompanyType {...editButtonProps} />
      }
      {
        companyTypeList[0] &&
        <Box className={classes.dataGrid}>
          <Box className={classes.dataGridFlex}>
            <Box className={classes.grow}>
              <DataGrid
                rows={companyTypeList}
                columns={companyTypeColumns}
                pageSize={25}
                components={{
                  Toolbar: GridToolbar,
                }}
                onSelectionModelChange={handleSelection}
              />
            </Box>
          </Box>
        </Box>
      }
    </Box>
  );
}
