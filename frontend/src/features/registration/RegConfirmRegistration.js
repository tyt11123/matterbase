import React, { useEffect } from "react";
import {
  regVerifyRegistration,
  selectRegVerifyRegistration,
} from "./regAsyncThunk";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../../components/styles/materialUIStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    margin: theme.spacing(20, 0),
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(15, 0),
    },
  },
}));

export default function RegConfirmRegistration() {
  const classes = useStyles();
  const { token } = useParams();
  const dispatch = useDispatch();
  const regSignup = useSelector(selectRegVerifyRegistration);
  const {
    isLoading,
    isSuccess,
    isFail,
  } = regSignup;

  useEffect(() => {
    if (token) dispatch(regVerifyRegistration({ token }));
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <CssBaseline />
        <Container maxWidth="sm">
          <div className={classes.root}>
            <Typography variant="h5" gutterBottom>
              Registration Confirmation
            </Typography>
            {
              isLoading &&
              <React.Fragment>
              <Typography variant="h2" gutterBottom>
                Loading...
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                We are currently processing your request
              </Typography>
              </React.Fragment>
            }
            {
              isSuccess &&
              <React.Fragment>
              <Typography variant="h2" gutterBottom>
                Welcome
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                You are eligible for our service now
              </Typography>
              </React.Fragment>
            }
            {
              isFail &&
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
              </React.Fragment>
            }
            <Typography variant="body1" gutterBottom>
              <Link href="/" color="inherit">
                Back to Main Page
              </Link>
            </Typography>
          </div>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
