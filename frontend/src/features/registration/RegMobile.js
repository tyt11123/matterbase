import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { regSignup } from "./regAsyncThunk";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../../components/styles/materialUIStyles";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  listItem: {
    flexDirection: "column",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyType: "",
    jobTitle: "",
    companyLocation: "",
    companyWebsite: "",
    isSubscribe: true,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (values.password.length < 9) {
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
    dispatch(regSignup(values));
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <MenuItem onClick={handleClickOpen}>
          <IconButton
            aria-label="register"
            aria-controls="primary-search-register-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Register</p>
        </MenuItem>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                New Account
              </Typography>
              <Button autoFocus color="inherit" onClick={handleSubmit}>
                register
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem className={classes.listItem}>
              {showHint && (
                <ListItemText primary="Oops! Something is still wrong below." />
              )}
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
                required
                error={
                  isUserActionMade &&
                  Boolean(values.email.match(/\S+@\S+\.\S+/)) === false
                }
                defaultValue={values.email}
                onChange={handleValues("email")}
                variant="outlined"
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                required
                error={isUserActionMade && values.password.length < 9}
                defaultValue={values.password}
                onChange={handleValues("password")}
                variant="outlined"
                margin="dense"
                autoComplete="off"
                label="Password"
                type={showPassword ? "text" : "password"}
                helperText="At least 9-character long"
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
                required
                error={isUserActionMade && confirmPassword !== values.password}
                defaultValue={confirmPassword}
                onChange={(e) => {
                  setIsUserActionMade(true);
                  setConfirmPassword(e.target.value);
                }}
                variant="outlined"
                margin="dense"
                autoComplete="off"
                label="Confirm Password"
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
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                error={
                  isUserActionMade && Boolean(values.companyType) === false
                }
                defaultValue={values.companyType}
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
                defaultValue={values.jobTitle}
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
                defaultValue={values.companyLocation}
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
                defaultValue={values.companyWebsite}
                onChange={handleValues("companyWebsite")}
                variant="outlined"
                margin="dense"
                id="company-website"
                label="Company Website"
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.isSubscribe}
                    onChange={(e) =>
                      setValues({ ...values, isSubscribe: e.target.checked })
                    }
                    name="isSubscribe"
                    color="primary"
                    inputProps={{
                      "aria-label": "Sign up to the Matterbase mailing list",
                    }}
                  />
                }
                label="Sign up to the Matterbase mailing list"
              />
            </ListItem>
          </List>
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}
