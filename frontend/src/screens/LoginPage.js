import React, { useState, useEffect } from "react";
import { authLogin } from "../features/authentication/authAsyncThunk";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthUserInfo } from "../features/authentication/authAsyncThunk";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../components/styles/materialUIStyles";
import Container from '@material-ui/core/Container';
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FacebookIcon from "@material-ui/icons/Facebook";
import GoogleIcon from "../components/img/GoogleIcon";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import {
  BlackButton,
  BlueButton,
  LightBlueButton,
} from "../components/CustomButtons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  smallBottomMargin: {
    width: "100%",
    margin: theme.spacing(1, 1, 0.5, 1),
  },
  largeBottomMargin: {
    width: "100%",
    margin: theme.spacing(1, 1, 3, 1),
  },
  dialogContent: {
    textAlign: "left",
  },
  dialogContentText: {
    textAlign: "center",
  },
  dialogActions: {
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(1, 3),
  },
  dialogTitle: {
    "& *": {
      borderBottom: "1px solid black",
    },
  },
  hint: {
    margin: theme.spacing(0, 1, 1, 1),
    textAlign: "center",
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const { payload } = useSelector(selectAuthUserInfo);
  const classes = useStyles();
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    isStaySignin: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);

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

  useEffect(() => {
    const from = query.get("from");
    const { id } = payload;
    if (Boolean(id) === true) {
      from ? history.push(`/${from}`) : history.push("/");
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <Container maxWidth="sm" className={classes.root} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Login
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <DialogContentText className={classes.dialogContentText}>
              Enter you email address and password to access your account
            </DialogContentText>
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
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <BlackButton
              variant="contained"
              color="primary"
              className={classes.smallBottomMargin}
              onClick={handleSubmit}
            >
              Log in
            </BlackButton>
            <DialogContentText className={classes.hint}>
              <Link href="/recovery/" color="inherit">
                Forget your password?
              </Link>
            </DialogContentText>
            <BlueButton
              variant="contained"
              color="primary"
              className={classes.smallBottomMargin}
              startIcon={<FacebookIcon />}
              onClick={handleFacebook}
            >
              Continue with Facebook
            </BlueButton>
            <LightBlueButton
              variant="contained"
              color="primary"
              className={classes.largeBottomMargin}
              startIcon={<GoogleIcon />}
              onClick={handleGoogle}
            >
              Sign in with Google
            </LightBlueButton>
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
