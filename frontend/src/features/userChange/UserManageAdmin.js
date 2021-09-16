import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { userManageAdmin } from "./userAsyncThunk";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../../components/styles/materialUIStyles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { LightBlueButton, BlackButton } from "../../components/CustomButtons";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  dialogActions: {
    justifyContent: "center",
    flexDirection: "column",
  },
  dialogTitle: {
    "& *": {
      borderBottom: "1px solid black",
    },
  },
  largeBottomMargin: {
    width: "70%",
    margin: theme.spacing(1, 1, 3, 1),
  },
  hint: {
    margin: theme.spacing(0, 1, 1, 1),
    textAlign: "center",
  },
}));

function UserManageAdmin({ isSelected, data }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = useState({
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    remarks: data.remarks,
    isSuper: data.isSuper,
    isDisabled: data.isDisabled,
  });
  const [showHint, setShowHint] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValues = (prop) => (event) => {
    setIsUserActionMade(true);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    setIsUserActionMade(true);
    if (Boolean(values.firstName) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.lastName) === false) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    dispatch(userManageAdmin(values));
  };

  useEffect(() => {
    const { id, firstName, lastName, remarks, isSuper, isDisabled } = data;
    setValues({ id, firstName, lastName, remarks, isSuper, isDisabled });
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <LightBlueButton
          variant="contained"
          color="primary"
          disabled={isSelected === false}
          className={classes.margin}
          onClick={handleClickOpen}
        >
          Edit
        </LightBlueButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-create-admin"
          scroll="body"
        >
          <DialogTitle
            id="form-dialog-create-admin"
            className={classes.dialogTitle}
          >
            Edit Admin
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Personal Details</DialogContentText>
            <TextField
              autoFocus
              required
              error={isUserActionMade && Boolean(values.firstName) === false}
              defaultValue={values.firstName}
              onChange={handleValues("firstName")}
              variant="outlined"
              margin="dense"
              id="name"
              label="First Name"
              fullWidth
            />
            <TextField
              required
              error={isUserActionMade && Boolean(values.lastName) === false}
              defaultValue={values.lastName}
              onChange={handleValues("lastName")}
              variant="outlined"
              margin="dense"
              id="lastname"
              label="Last Name"
              fullWidth
            />
            <TextField
              disabled
              defaultValue={data.email}
              variant="outlined"
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              helperText="Email change is forbidden. Disable the account if there is a typo."
              autoComplete="off"
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Remarks</DialogContentText>
            <TextField
              defaultValue={values.remarks}
              onChange={handleValues("remarks")}
              variant="outlined"
              margin="dense"
              id="remarks"
              label="Remarks"
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isSuper}
                  onChange={(e) =>
                    setValues({ ...values, isSuper: e.target.checked })
                  }
                  name="isSuper"
                  color="primary"
                  inputProps={{
                    "aria-label": "Super Admin (Able to Disable Other Admin)",
                  }}
                />
              }
              label="Super Admin (Able to Disable Other Admin)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isDisabled}
                  onChange={(e) =>
                    setValues({ ...values, isDisabled: e.target.checked })
                  }
                  name="isDisabled"
                  color="primary"
                  inputProps={{
                    "aria-label": "Disabled",
                  }}
                />
              }
              label="Disabled"
            />
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <BlackButton
              variant="contained"
              color="primary"
              className={classes.largeBottomMargin}
              onClick={handleSubmit}
            >
              Update Account
            </BlackButton>
          </DialogActions>
          {showHint && (
            <DialogContentText className={classes.hint}>
              Oops! Something is still wrong above.
            </DialogContentText>
          )}
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}

UserManageAdmin.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      remarks: PropTypes.string,
      isSuper: PropTypes.bool,
      isDisabled: PropTypes.bool,
      created_at: PropTypes.object,
      updated_at: PropTypes.object,
    }).isRequired,
};

export default UserManageAdmin;
