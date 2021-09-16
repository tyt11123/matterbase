import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { regSubscribe } from "./regAsyncThunk";
import {
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  header_title_colour,
  titleFont,
} from "../../components/styles/materialUIStyles";
import AppBar from "@material-ui/core/AppBar";
import MuiToolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import PinterestIcon from "@material-ui/icons/Pinterest";
import InstagramIcon from "@material-ui/icons/Instagram";
import { BlackButton } from "../../components/CustomButtons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    background: header_title_colour,
    color: theme.palette.common.black,
  },
  toolBar: {
    padding: theme.spacing(5, 1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(2, 0),
    },
  },
  socialMedia: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& *": {
      margin: theme.spacing(0, 1),
    },
  },
}));

const Toolbar = withStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
}))(MuiToolbar);

export default function RegSubscribe() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = React.useState({
    email: "",
    firstName: "",
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
    values.firstName = values.email.slice(0, values.email.indexOf("@"));
    setShowHint(false);
    dispatch(regSubscribe(values));
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={titleFont}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Box className={classes.toolBar}>
              <Typography variant="h5">
                Sign up to us and enjoy hearing all things about design
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
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
                    id="subscription"
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
                  Oops! Something is still wrong above.
                </Typography>
              )}
              <Box className={classes.socialMedia}>
                <Link
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  color="inherit"
                  target="_blank"
                  rel="noopener"
                >
                  <FacebookIcon fontSize="large" />
                </Link>
                <Link
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  color="inherit"
                  target="_blank"
                  rel="noopener"
                >
                  <YouTubeIcon fontSize="large" />
                </Link>
                <Link
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  color="inherit"
                  target="_blank"
                  rel="noopener"
                >
                  <TwitterIcon fontSize="large" />
                </Link>
                <Link
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  color="inherit"
                  target="_blank"
                  rel="noopener"
                >
                  <PinterestIcon fontSize="large" />
                </Link>
                <Link
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  color="inherit"
                  target="_blank"
                  rel="noopener"
                >
                  <InstagramIcon fontSize="large" />
                </Link>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </React.Fragment>
  );
}
