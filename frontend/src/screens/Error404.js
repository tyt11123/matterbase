import React from "react";
import { makeStyles, ThemeProvider, } from "@material-ui/core/styles";
import {
  bodyFont,
} from "../components/styles/materialUIStyles";
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

export default function Error404() {
  const classes = useStyles();

  return (
    <React.Fragment>
    <ThemeProvider theme={bodyFont}>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.root}>
          <Typography variant="h1" component="h2" gutterBottom>
            404
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            The Page You Are Looking For Was Not Found
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link href="/" color="inherit">
              Back to Home
            </Link>
          </Typography>
        </div>
      </Container>
    </ThemeProvider>
    </React.Fragment>
  );
}
