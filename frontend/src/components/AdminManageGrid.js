import React, { useState, useEffect } from "react";
import adminAccountColumns from "./types/adminAccount";
import UserCreateAdmin from "../features/userChange/UserCreateAdmin";
import UserManageAdmin from "../features/userChange/UserManageAdmin";
import { useSelector, useDispatch } from "react-redux";
import {
  userListAdmin,
  selectUserCreateAdmin,
  selectUserListAdmin,
  selectUserManageAdmin,
} from "../features/userChange/userAsyncThunk";
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

export default function AdminManageGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [adminList, setAdminList] = useState([]);
  const [editButtonProps, setEditButtonProps] = useState({
    isSelected: false,
    data: {
      id: 0, firstName: "", lastName: "", email: "",
      remarks: "", isSuper: false, isDisabled: false,
      created_at: new Date(),
      updated_at: new Date(),
    }
  });
  const userListAdminStore = useSelector(selectUserListAdmin);
  const { payload } = userListAdminStore;
  const userManageAdminStore = useSelector(selectUserManageAdmin);
  const { isSuccess: userManageAdminSuccess } = userManageAdminStore;
  const userCreateAdminStore = useSelector(selectUserCreateAdmin);
  const { isSuccess: userCreateAdminSuccess } = userCreateAdminStore;
  
  const handleSelection = (selected) => {
    if (selected[0]) {
      const index = adminList.findIndex(x => x.id === selected[0]);
      setEditButtonProps({ isSelected: true, data: { ...adminList[index] } });
    } else {
      setEditButtonProps({
        isSelected: false,
        data: {
          id: 0, firstName: "", lastName: "", email: "",
          remarks: "", isSuper: false, isDisabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        }
      });
    };
  };

  useEffect(() => {
    dispatch(userListAdmin());
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userManageAdminSuccess, userCreateAdminSuccess]);

  useEffect(() => {
    let user = [...payload];
    let list = [];
    if (user.length > 0) {
      for (let i = 0; i < user.length; i++) {
        let item = {
          ...user[i],
          created_at: new Date(user[i].created_at),
          updated_at: new Date(user[i].updated_at),
        }
        list.push(item);
      };
      setAdminList(list);
    };
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <Box className={classes.root}>
      <Typography>Admin Management</Typography>
      <UserCreateAdmin />
      {
        adminList[0] &&
        <UserManageAdmin {...editButtonProps} />
      }
      {
        adminList[0] &&
        <Box className={classes.dataGrid}>
          <Box className={classes.dataGridFlex}>
            <Box className={classes.grow}>
              <DataGrid
                rows={adminList}
                columns={adminAccountColumns}
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
