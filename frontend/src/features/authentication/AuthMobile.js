import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authLogin } from "./authAsyncThunk";
import {
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { bodyFont } from "../../components/styles/materialUIStyles";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FacebookIcon from "@material-ui/icons/Facebook";
import GoogleIcon from "../../components/img/GoogleIcon";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import {
  BlackButton,
  BlueButton,
  LightBlueButton,
} from "../../components/CustomButtons";

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
    alignItems: "baseline",
    "& a": {
      alignSelf: "center",
    },
  },
  margin: {
    width: "100%",
    margin: theme.spacing(1, 0),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    isStaySignin: false,
  });
  const [showPassword, setShowPassword] = useState(false);
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

  const handlePointerDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    setIsUserActionMade(true);
    if (Boolean(values.email.match(/\S+@\S+\.\S+/)) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.password) === false) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    dispatch(authLogin(values));
  };

  const handleFacebook = (event) => {
    event.preventDefault();
    window.location.assign(`${process.env.REACT_APP_BACKEND_URL}/api/login/federated/facebook`);
  };

  const handleGoogle = (event) => {
    event.preventDefault();
    window.location.assign(`${process.env.REACT_APP_BACKEND_URL}/api/login/federated/google`);
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
          <p>Login</p>
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
                Login
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem className={classes.listItem}>
              {showHint && (
                <ListItemText primary="Oops! Something is still wrong below." />
              )}
              <TextField
                autoFocus
                error={
                  isUserActionMade &&
                  Boolean(values.email.match(/\S+@\S+\.\S+/)) === false
                }
                defaultValue={values.email}
                onChange={handleValues("email")}
                variant="outlined"
                margin="dense"
                id="email"
                label="Email address"
                fullWidth
              />
              <TextField
                error={isUserActionMade && Boolean(values.password) === false}
                defaultValue={values.password}
                onChange={handleValues("password")}
                variant="outlined"
                margin="dense"
                autoComplete="off"
                label="Password"
                type={showPassword ? "text" : "password"}
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.isStaySignin}
                    onChange={(e) =>
                      setValues({ ...values, isStaySignin: e.target.checked })
                    }
                    name="isStaySignin"
                    color="primary"
                    inputProps={{
                      "aria-label": "Stay Sign-in",
                    }}
                  />
                }
                label="Stay Sign-in"
              />
              <BlackButton
                autoFocus
                variant="contained"
                color="primary"
                className={classes.margin}
                onClick={handleSubmit}
              >
                Log in
              </BlackButton>
              <Link
                href="/recovery/"
                color="inherit"
              >
                <ListItemText primary="Forget your password?" />
              </Link>
            </ListItem>
            <Divider className={classes.divider} />
            <ListItem className={classes.listItem}>
              <BlueButton
                variant="contained"
                color="primary"
                className={classes.margin}
                startIcon={<FacebookIcon />}
                onClick={handleFacebook}
              >
                Continue with Facebook
              </BlueButton>
              <LightBlueButton
                variant="contained"
                color="primary"
                className={classes.margin}
                startIcon={<GoogleIcon />}
                onClick={handleGoogle}
              >
                Sign in with Google
              </LightBlueButton>
            </ListItem>
          </List>
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}
