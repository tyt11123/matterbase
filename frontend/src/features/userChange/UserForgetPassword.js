import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  userForgetPassword,
  selectUserForgetPassword,
} from "./userAsyncThunk";
import {
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { bodyFont } from "../../components/styles/materialUIStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { BlackButton } from "../../components/CustomButtons";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 1),
    "& > *": {
      margin: theme.spacing(2, 0),
    },
  },
}));

export default function UserForgetPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userForgetPasswordStore = useSelector(selectUserForgetPassword);
  const { isSuccess: userForgetPasswordSuccess } = userForgetPasswordStore;
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = React.useState({
    email: "",
  });
  const [showHint, setShowHint] = useState(false);

  const handleValues = (prop) => (event) => {
    setIsUserActionMade(true);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    setIsUserActionMade(true);
    console.log(values);
    if (Boolean(values.email.match(/\S+@\S+\.\S+/)) === false) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    dispatch(userForgetPassword(values));
  };

  useEffect(() => {
    if (userForgetPasswordSuccess) history.replace("/");
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userForgetPasswordSuccess]);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <Container className={classes.root} maxWidth="sm">
          <Typography variant="h3">
            Forget Password?
          </Typography>
          <Typography variant="h5">
            Enter your registered email to receive the recovery instruction.
          </Typography>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} sm={10}>
              <TextField
                error={
                  isUserActionMade &&
                  Boolean(values.email.match(/\S+@\S+\.\S+/)) === false
                }
                defaultValue={values.email}
                onChange={handleValues("email")}
                variant="outlined"
                margin="dense"
                id="email"
                label="your email here"
                type="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <BlackButton
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </BlackButton>
            </Grid>
          </Grid>
          {showHint && (
            <Typography variant="body1">
              Oops! Something is wrong above.
            </Typography>
          )}
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
