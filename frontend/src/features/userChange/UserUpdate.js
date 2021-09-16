import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userUpdate } from "./userAsyncThunk";
import { selectAuthUserInfo } from "../authentication/authAsyncThunk";
import {
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  bodyFont,
} from "../../components/styles/materialUIStyles";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { BlackButton } from "../../components/CustomButtons";

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

export default function UserUpdate() {
  const dispatch = useDispatch();
  const authUserInfoStore = useSelector(selectAuthUserInfo);
  const { payload: userInfo, isLoggedOut } = authUserInfoStore;
  const history = useHistory();
  const classes = useStyles();
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    currentPassword: "",
    password: "",
    companyType: "",
    jobTitle: "",
    companyLocation: "",
    companyWebsite: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleValues = (prop) => (event) => {
    setIsUserActionMade(true);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!Boolean(showCurrentPassword));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!Boolean(showPassword));
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!Boolean(showConfirmPassword));
  };

  const handlePointerDownPassword = (event) => {
    event.preventDefault();
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
    if (Boolean(values.email.match(/\S+@\S+\.\S+/)) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.currentPassword) === false) {
      setShowHint(true);
      return;
    }
    if (values.password.length > 0 && values.password.length < 9) {
      setShowHint(true);
      return;
    }
    if (confirmPassword !== values.password) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.companyType) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.jobTitle) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.companyLocation) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.companyWebsite) === false) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    dispatch(userUpdate(values));
  };

  useEffect(() => {
    if (isLoggedOut) {
      return history.push("/");
    };
    if (Boolean(userInfo.id) === false) {
      return history.push("/login?from=account");
    };
    userInfo.telephone ?
      setValues({ ...values, ...userInfo }) :
      setValues({ ...values, ...userInfo, telephone: "" });
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, isLoggedOut]);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            View / Update Your Matterbase Account
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Account Details</DialogContentText>
            <TextField
              autoFocus
              required
              error={isUserActionMade && Boolean(values.firstName) === false}
              value={values.firstName}
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
              value={values.lastName}
              onChange={handleValues("lastName")}
              variant="outlined"
              margin="dense"
              id="lastname"
              label="Last Name"
              fullWidth
            />
            <TextField
              required
              error={
                isUserActionMade &&
                Boolean(values.email.match(/\S+@\S+\.\S+/)) === false
              }
              value={values.email}
              onChange={handleValues("email")}
              variant="outlined"
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              autoComplete="off"
            />
            <TextField
              value={values.telephone}
              onChange={handleValues("telephone")}
              variant="outlined"
              margin="dense"
              id="telephone"
              label="Telephone number"
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Password</DialogContentText>
            <TextField
              required
              error={isUserActionMade && Boolean(values.currentPassword) === false}
              defaultValue={values.currentPassword}
              onChange={handleValues("currentPassword")}
              variant="outlined"
              margin="dense"
              autoComplete="new-password"
              label="Current password"
              type={showCurrentPassword ? "text" : "password"}
              helperText="Correct current password required upon any profile update request."
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCurrentPassword}
                      onPointerDown={handlePointerDownPassword}
                      edge="end"
                    >
                      {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={isUserActionMade && values.password.length > 0 && values.password.length < 9}
              defaultValue={values.password}
              onChange={handleValues("password")}
              variant="outlined"
              margin="dense"
              autoComplete="new-password"
              label="New Password"
              type={showPassword ? "text" : "password"}
              helperText="At least 9-character long; leave it blank if no change is required."
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onPointerDown={handlePointerDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={isUserActionMade && confirmPassword !== values.password}
              defaultValue={confirmPassword}
              onChange={(e) => {
                setIsUserActionMade(true);
                setConfirmPassword(e.target.value);
              }}
              variant="outlined"
              margin="dense"
              autoComplete="off"
              label="Retype New Password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onPointerDown={handlePointerDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Work Details</DialogContentText>
            <TextField
              required
              error={isUserActionMade && Boolean(values.companyType) === false}
              value={values.companyType}
              onChange={handleValues("companyType")}
              variant="outlined"
              margin="dense"
              id="company-type"
              label="Company Type"
              fullWidth
            />
            <TextField
              required
              error={isUserActionMade && Boolean(values.jobTitle) === false}
              value={values.jobTitle}
              onChange={handleValues("jobTitle")}
              variant="outlined"
              margin="dense"
              id="job-title"
              label="Job Title"
              fullWidth
            />
            <TextField
              required
              error={
                isUserActionMade && Boolean(values.companyLocation) === false
              }
              value={values.companyLocation}
              onChange={handleValues("companyLocation")}
              variant="outlined"
              margin="dense"
              id="company-location"
              label="Company Location"
              fullWidth
            />
            <TextField
              required
              error={
                isUserActionMade && Boolean(values.companyWebsite) === false
              }
              value={values.companyWebsite}
              onChange={handleValues("companyWebsite")}
              variant="outlined"
              margin="dense"
              id="company-website"
              label="Company Website"
              fullWidth
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
      </ThemeProvider>
    </React.Fragment>
  );
}
