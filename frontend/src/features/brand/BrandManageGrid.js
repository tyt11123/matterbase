import React, { useState, useEffect } from "react";
import brandColumns from "../../components/types/brand";
import BrandCreate from "./BrandCreate";
import BrandEdit from "./BrandEdit";
import BrandPreview from "./BrandPreview";
import { useSelector, useDispatch } from "react-redux";
import {
  brandList,
  selectBrandList,
  selectBrandCreate,
  selectBrandEdit,
} from "./brandAsyncThunk";
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

export default function BrandManageGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [brandFullList, setBrandFullList] = useState([]);
  const [createBtnKey, setCreateBtnKey] = useState(`${Math.random().toString().substring(14)}`);
  const [editBtnKey, setEditBtnKey] = useState(`${Math.random().toString().substring(14)}`);
  const [editButtonProps, setEditButtonProps] = useState({
    isSelected: false,
    data: {
      id: 0, name: "", country: "", website: "",
      logoURL: "", supplier: "", leftIntro: "",
      rightIntro: "", isSupplier: false, HKOffice: false,
      created_at: new Date(),
      updated_at: new Date(),
    }
  });
  const [previewButtonProps, setPreviewButtonProps] = useState({
    isSelected: false,
    id: 0,
  });
  const brandListStore = useSelector(selectBrandList);
  const { payload } = brandListStore;
  const brandEditStore = useSelector(selectBrandEdit);
  const { isSuccess: brandEditSuccess } = brandEditStore;
  const brandCreateStore = useSelector(selectBrandCreate);
  const { isSuccess: brandCreateSuccess } = brandCreateStore;
  
  const handleSelection = (selected) => {
    if (selected[0]) {
      const index = brandFullList.findIndex(x => x.id === selected[0]);
      setEditButtonProps({ isSelected: true, data: { ...brandFullList[index] } });
      setPreviewButtonProps({ isSelected: true, id: selected[0] });
    } else {
      setEditButtonProps({
        isSelected: false,
        data: {
          id: 0, name: "", country: "", website: "",
          logoURL: "", supplier: "", leftIntro: "",
          rightIntro: "", isSupplier: false, HKOffice: false,
          created_at: new Date(),
          updated_at: new Date(),
        }
      });
      setPreviewButtonProps({
        isSelected: false,
        id: 0,
      });
    };
  };

  useEffect(() => {
    dispatch(brandList());
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandEditSuccess, brandCreateSuccess]);

  useEffect(() => {
    setCreateBtnKey(`brand-create-${Math.random().toString().substring(14)}`);
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandCreateSuccess]);

  useEffect(() => {
    setEditBtnKey(`brand-edit-${Math.random().toString().substring(14)}`);
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandEditSuccess]);

  useEffect(() => {
    let brand = [...payload];
    let list = [];
    if (brand.length > 0) {
      for (let i = 0; i < brand.length; i++) {
        let item = {
          ...brand[i],
          created_at: new Date(brand[i].created_at),
          updated_at: new Date(brand[i].updated_at),
        }
        list.push(item);
      };
      setBrandFullList(list);
    };
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <Box className={classes.root}>
      <Typography>Brand Management</Typography>
      <BrandCreate key={createBtnKey}/>
      {
        brandFullList[0] &&
        <BrandEdit
          key={editBtnKey}
          {...editButtonProps}
        />
      }
      {
        brandFullList[0] &&
        <BrandPreview
          {...previewButtonProps}
        />
      }
      {
        brandFullList[0] &&
        <Box className={classes.dataGrid}>
          <Box className={classes.dataGridFlex}>
            <Box className={classes.grow}>
              <DataGrid
                rows={brandFullList}
                columns={brandColumns}
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
