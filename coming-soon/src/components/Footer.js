import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  footer_background_colour,
  footer_title_colour,
  footer_secondary_colour,
} from "../styles/materialUIStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    background: footer_background_colour,
  },
  grow: {
    flexGrow: 1,
  },
  message: {
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    fontFamily: "Roboto",
  },
  title: {
    color: footer_title_colour,
  },
  body: {
    color: footer_secondary_colour,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container className={classes.message}>
            <Grid item xs={12}>
              <Box mt={5}>&nbsp;</Box>
              <Typography
                className={classes.content}
                variant="h5"
                align="center"
              >
                <strong className={classes.title}>
                  We’re open to suggestions.
                </strong>
              </Typography>
              <Box>&nbsp;</Box>
              <Typography
                className={classes.content}
                variant="h5"
                align="center"
                color="inherit"
              >
                Email us at&nbsp;
                <Link href="mailto:info@matterbase.com" color="inherit">
                  info@matterbase.com
                </Link>
              </Typography>
              <Box mt={5}>&nbsp;</Box>
              <Typography
                className={classes.content}
                variant="body1"
                align="center"
              >
                <strong className={classes.body}>
                  Copyright © 2021 matterbase.com, All rights reserved.
                </strong>
              </Typography>
              <Typography
                className={classes.content}
                variant="body1"
                align="center"
              >
                <strong className={classes.body}>
                  Matterbase.com; Office 1, 15/F,
                  K83, Kwai Chung, N.T. Hong Kong
                </strong>
              </Typography>
              <Box mt={5}>&nbsp;</Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
