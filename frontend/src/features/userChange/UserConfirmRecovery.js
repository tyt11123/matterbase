import React, { useState, useEffect } from "react";
import {
  authUserInfo,
  selectAuthUserInfo,
} from "../authentication/authAsyncThunk";
import {
  userVerifyRecovery,
  selectUserVerifyRecovery,
  userFinishRecovery,
  selectUserFinishRecovery,
} from "./userAsyncThunk";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../../components/styles/materialUIStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { BlackButton } from "../../components/CustomButtons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    margin: theme.spacing(20, 0),
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(15, 0),
    },
  },
  dialogActions: {
    justifyContent: "center",
    flexDirection: "column",
  },
  hint: {
    margin: theme.spacing(0, 1, 1, 1),
    textAlign: "center",
  },
}));

export default function UserConfirmRecovery() {
  const classes = useStyles();
  const { token } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { csrfToken } = useSelector(selectAuthUserInfo);
  const userVerifyRecoveryStore = useSelector(selectUserVerifyRecovery);
  const {
    isLoading: userVerifyRecoveryLoading,
    isSuccess: userVerifyRecoverySuccess,
    failCode: userVerifyRecoveryFailCode,
  } = userVerifyRecoveryStore;
  const userFinishRecoveryStore = useSelector(selectUserFinishRecovery);
  const {
    isSuccess: userFinishRecoverySuccess,
  } = userFinishRecoveryStore;
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = React.useState({
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);

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
    if (values.password.length > 0 && values.password.length < 9) {
      setShowHint(true);
      return;
    }
    if (confirmPassword !== values.password) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    dispatch(userFinishRecovery(values));
  };

  useEffect(() => {
    if (Boolean(csrfToken) === true) {
      axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
      dispatch(userVerifyRecovery({ token }));
    };
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csrfToken]);

  useEffect(() => {
    if (userFinishRecoverySuccess) {
      dispatch(authUserInfo());
      history.replace("/");
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFinishRecoverySuccess]);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <CssBaseline />
        <Container maxWidth="sm">
          <div className={classes.root}>
            <Typography variant="h5" gutterBottom>
              Password Recovery
            </Typography>
            {userVerifyRecoveryLoading && (
              <React.Fragment>
                <Typography variant="h2" gutterBottom>
                  Loading...
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  We are currently processing your request
                </Typography>
              </React.Fragment>
            )}
            {userVerifyRecoverySuccess && (
              <React.Fragment>
                <DialogContent>
                  <TextField
                    error={
                      isUserActionMade &&
                      values.password.length > 0 &&
                      values.password.length < 9
                    }
                    defaultValue={values.password}
                    onChange={handleValues("password")}
                    variant="outlined"
                    margin="dense"
                    autoComplete="new-password"
                    label="New Password"
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
                    error={
                      isUserActionMade && confirmPassword !== values.password
                    }
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
              </React.Fragment>
            )}
            {userVerifyRecoveryFailCode === 401 && (
              <React.Fragment>
                <Typography variant="h2" gutterBottom>
                  Oops...
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  We are unable to process your request currently
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Please try again later
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <Link href="/" color="inherit">
                    Back to Main Page
                  </Link>
                </Typography>
              </React.Fragment>
            )}
            {userVerifyRecoveryFailCode === 406 && (
              <React.Fragment>
                <Typography variant="h2" gutterBottom>
                  Oops...
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  The requested resource has been expired.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Please create a new request.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <Link href="/" color="inherit">
                    Back to Main Page
                  </Link>
                </Typography>
              </React.Fragment>
            )}
          </div>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
