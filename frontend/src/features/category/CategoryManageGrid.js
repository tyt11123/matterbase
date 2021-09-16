import React, { useState, useEffect } from "react";
import categoryColumns from "../../components/types/category";
import CategoryCreate from "./CategoryCreate";
import CategoryEdit from "./CategoryEdit";
import CategoryDelete from "./CategoryDelete";
import { useSelector, useDispatch } from "react-redux";
import {
  categoryList,
  selectCategoryList,
  selectCategoryCreate,
  selectCategoryEdit,
} from "./categoryAsyncThunk";
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

export default function CategoryManageGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [categoryFullList, setCategoryFullList] = useState([]);
  const [createBtnKey, setCreateBtnKey] = useState(`${Math.random().toString().substring(14)}`);
  const [editBtnKey, setEditBtnKey] = useState(`${Math.random().toString().substring(14)}`);
  const [createButtonProps, setCreateButtonProps] = useState({
    data: {
      parent_id: null, parent_name: "null", name: "", imageURL: "",
    }
  });
  const [editButtonProps, setEditButtonProps] = useState({
    isSelected: false,
    data: {
      id: 0, name: "", imageURL: "",
      created_at: new Date(),
      updated_at: new Date(),
    }
  });
  const categoryListStore = useSelector(selectCategoryList);
  const { payload } = categoryListStore;
  const categoryEditStore = useSelector(selectCategoryEdit);
  const { isSuccess: categoryEditSuccess } = categoryEditStore;
  const categoryCreateStore = useSelector(selectCategoryCreate);
  const { isSuccess: categoryCreateSuccess } = categoryCreateStore;
  
  const handleSelection = (selected) => {
    if (selected[0]) {
      const index = categoryFullList.findIndex(x => x.id === selected[0]);
      setCreateButtonProps({
        data: {
          parent_id: selected[0],
          parent_name: categoryFullList[index].fullname,
          name: "", imageURL: "",
        }
      });
      setEditButtonProps({ isSelected: true, data: { ...categoryFullList[index] } });
    } else {
      setCreateButtonProps({
        data: {
          parent_id: null, parent_name: "null", name: "", imageURL: "",
        }
      });
      setEditButtonProps({
        isSelected: false,
        data: {
          id: 0, name: "", imageURL: "",
          created_at: new Date(),
          updated_at: new Date(),
        }
      });
    };
  };

  useEffect(() => {
    dispatch(categoryList());
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryEditSuccess, categoryCreateSuccess]);

  useEffect(() => {
    setCreateBtnKey(`category-create-${Math.random().toString().substring(14)}`);
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryCreateSuccess]);

  useEffect(() => {
    setEditBtnKey(`category-edit-${Math.random().toString().substring(14)}`);
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryEditSuccess]);

  useEffect(() => {
    let category = [...payload];
    let list = [];
    if (category.length > 0) {
      for (let i = 0; i < category.length; i++) {
        let item = {
          ...category[i],
          created_at: new Date(category[i].created_at),
          updated_at: new Date(category[i].updated_at),
        }
        list.push(item);
      };
      setCategoryFullList(list);
    };
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <Box className={classes.root}>
      <Typography>Category Management</Typography>
      <CategoryCreate key={createBtnKey} {...createButtonProps}/>
      {
        categoryFullList[0] &&
        <CategoryEdit
          key={editBtnKey}
          {...editButtonProps}
        />
      }
      { categoryFullList[0] && <CategoryDelete {...editButtonProps} /> }
      {
        categoryFullList[0] &&
        <Box className={classes.dataGrid}>
          <Box className={classes.dataGridFlex}>
            <Box className={classes.grow}>
              <DataGrid
                rows={categoryFullList}
                columns={categoryColumns}
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
