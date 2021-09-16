import React from "react";
// import { fade, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import {
  header_background_colour,
  header_title_colour,
  bodyFont,
} from "./styles/materialUIStyles";
import mainLogo from "./img/brand1tray3-1.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    color: theme.palette.common.white,
  },
  appBar: {
    background: header_background_colour,
    position: "relative",
    height: theme.spacing(12),
    [theme.breakpoints.up("sm")]: {
      height: theme.spacing(16),
    },
    padding: theme.spacing(3),
    // color: fade(theme.palette.common.white, 0.15),
  },
  mainLogo: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: header_title_colour,
  },
}));

export default function LandingPageBanner() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={bodyFont}>
      <ThemeProvider theme={bodyFont}>
        <div className={classes.grow}>
          <div className={classes.appBar}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={9}>
                <Tooltip
                  title="Pick over 300+ samples. Create your MatterBoard."
                  disableFocusListener
                  disableHoverListener
                  enterTouchDelay={100}
                >
                  <Typography align="left" color="inherit" variant="h5" noWrap>
                    Pick over 300+ samples. Create your{" "}
                    <span className={classes.title}>MatterBoard</span>.
                  </Typography>
                </Tooltip>
                <Typography align="left" color="inherit" variant="h5" noWrap>
                  100% Free.
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <img
                  src={mainLogo}
                  className={classes.mainLogo}
                  alt="fireSpot"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </ThemeProvider>
    </ThemeProvider>
  );
}
