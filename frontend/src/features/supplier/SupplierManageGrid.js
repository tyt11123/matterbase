import React, { useState, useEffect } from "react";
import supplierColumns from "../../components/types/supplier";
import SupplierCreate from "./SupplierCreate";
import SupplierEdit from "./SupplierEdit";
import { useSelector, useDispatch } from "react-redux";
import {
  supplierList,
  selectSupplierList,
  selectSupplierCreate,
  selectSupplierEdit,
} from "./supplierAsyncThunk";
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

export default function SupplierManageGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [supplierFullList, setSupplierFullList] = useState([]);
  const [createBtnKey, setCreateBtnKey] = useState(`${Math.random().toString().substring(14)}`);
  const [editBtnKey, setEditBtnKey] = useState(`${Math.random().toString().substring(14)}`);
  const [editButtonProps, setEditButtonProps] = useState({
    isSelected: false,
    data: {
      id: 0, firstName: "", lastName: "", email: "",
      telephone: "", companyName: "", companyType: "", jobTitle: "",
      country: "", companyLocation: "", companyWebsite: "",
      isAgency: false, isManufacturer: false, isDisabled: false,
      supplierLogoURL: "",
      created_at: new Date(),
      updated_at: new Date(),
    }
  });
  const supplierListStore = useSelector(selectSupplierList);
  const { payload } = supplierListStore;
  const supplierEditStore = useSelector(selectSupplierEdit);
  const { isSuccess: supplierEditSuccess } = supplierEditStore;
  const supplierCreateStore = useSelector(selectSupplierCreate);
  const { isSuccess: supplierCreateSuccess } = supplierCreateStore;
  
  const handleSelection = (selected) => {
    if (selected[0]) {
      const index = supplierFullList.findIndex(x => x.id === selected[0]);
      setEditButtonProps({ isSelected: true, data: { ...supplierFullList[index] } });
    } else {
      setEditButtonProps({
        isSelected: false,
        data: {
          id: 0, firstName: "", lastName: "", email: "",
          telephone: "", companyName: "", companyType: "", jobTitle: "",
          country: "", companyLocation: "", companyWebsite: "",
          isAgency: false, isManufacturer: false, isDisabled: false,
          supplierLogoURL: "",
          created_at: new Date(),
          updated_at: new Date(),
        }
      });
    };
  };

  useEffect(() => {
    dispatch(supplierList());
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierEditSuccess, supplierCreateSuccess]);

  useEffect(() => {
    setCreateBtnKey(`supplier-create-${Math.random().toString().substring(14)}`);
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierCreateSuccess]);

  useEffect(() => {
    setEditBtnKey(`supplier-edit-${Math.random().toString().substring(14)}`);
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierEditSuccess]);

  useEffect(() => {
    let supplier = [...payload];
    let list = [];
    if (supplier.length > 0) {
      for (let i = 0; i < supplier.length; i++) {
        let item = {
          ...supplier[i],
          created_at: new Date(supplier[i].created_at),
          updated_at: new Date(supplier[i].updated_at),
        }
        list.push(item);
      };
      setSupplierFullList(list);
    };
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <Box className={classes.root}>
      <Typography>Supplier Management</Typography>
      <SupplierCreate key={createBtnKey}/>
      {
        supplierFullList[0] &&
        <SupplierEdit
          key={editBtnKey}
          {...editButtonProps}
        />
      }
      {
        supplierFullList[0] &&
        <Box className={classes.dataGrid}>
          <Box className={classes.dataGridFlex}>
            <Box className={classes.grow}>
              <DataGrid
                rows={supplierFullList}
                columns={supplierColumns}
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
