import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { regSignup } from "./regAsyncThunk";
import {
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  bodyFont,
} from "../../components/styles/materialUIStyles";
import {
  Dialog,
  DialogTextField,
} from "../../components/CustomComponents";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  HighlightButton,
  BlackButton,
} from "../../components/CustomButtons";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  dialogActions: {
    justifyContent: "center",
    flexDirection: "column",
  },
  dialogTextFieldLeft: {
    maxWidth: "48%",
    marginRight: theme.spacing(1),
  },
  dialogTextFieldRight: {
    maxWidth: `calc(52% - ${theme.spacing(1)}px)`,
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

export default function RegDesktop() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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
        <HighlightButton
          variant="contained"
          color="primary"
          className={classes.margin}
          onClick={handleClickOpen}
        >
          Register
        </HighlightButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          scroll="body"
        >
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Create Your Matterbase Account
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Personal Details</DialogContentText>
            <DialogTextField
              autoFocus
              required
              className={classes.dialogTextFieldLeft}
              error={isUserActionMade && Boolean(values.firstName) === false}
              defaultValue={values.firstName}
              onChange={handleValues("firstName")}
              variant="outlined"
              margin="dense"
              id="name"
              label="First Name"
              fullWidth
            />
            <DialogTextField
              required
              className={classes.dialogTextFieldRight}
              error={isUserActionMade && Boolean(values.lastName) === false}
              defaultValue={values.lastName}
              onChange={handleValues("lastName")}
              variant="outlined"
              margin="dense"
              id="lastname"
              label="Last Name"
              fullWidth
            />
            <DialogTextField
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
              autoComplete="off"
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Password</DialogContentText>
            <DialogTextField
              required
              className={classes.dialogTextFieldLeft}
              error={isUserActionMade && values.password.length < 9}
              defaultValue={values.password}
              onChange={handleValues("password")}
              variant="outlined"
              margin="dense"
              autoComplete="new-password"
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
            <DialogTextField
              required
              className={classes.dialogTextFieldRight}
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
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Work Details</DialogContentText>
            <DialogTextField
              required
              error={isUserActionMade && Boolean(values.companyType) === false}
              defaultValue={values.companyType}
              onChange={handleValues("companyType")}
              variant="outlined"
              margin="dense"
              id="company-type"
              label="Company Type"
              fullWidth
            />
            <DialogTextField
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
            <DialogTextField
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
            <DialogTextField
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
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <BlackButton
              variant="contained"
              color="primary"
              className={classes.largeBottomMargin}
              onClick={handleSubmit}
            >
              Create Account
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
