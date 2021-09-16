import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userUpdateFederated } from "./userAsyncThunk";
import { selectAuthUserInfo } from "../authentication/authAsyncThunk";
import {
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  bodyFont,
} from "../../components/styles/materialUIStyles";
import Container from '@material-ui/core/Container';
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BlackButton } from "../../components/CustomButtons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
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

export default function UserFederatedInfo() {
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
    companyType: "",
    jobTitle: "",
    companyLocation: "",
    companyWebsite: "",
  });
  const [showHint, setShowHint] = useState(false);

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
    if (Boolean(values.email.match(/\S+@\S+\.\S+/)) === false) {
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
    dispatch(userUpdateFederated(values));
  };

  useEffect(() => {
    if (isLoggedOut) {
      return history.push("/");
    };
    if (Boolean(userInfo.id) === false) {
      return history.push("/login");
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
        <Container maxWidth="sm" className={classes.root} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            1 Last Step! Let Us Know You More
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Account Details</DialogContentText>
            <TextField
              autoFocus
              required
              disabled={Boolean(userInfo.firstName)}
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
              disabled={Boolean(userInfo.lastName)}
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
              disabled={Boolean(userInfo.email)}
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
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
