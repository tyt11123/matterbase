import React from "react";
import PropTypes from "prop-types";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "./styles/materialUIStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LandingPageBackdropImage from "./LandingPageBackdropImage";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 3),
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(10, 3),
    },
  },
  grid: {
    marginTop: theme.spacing(1),
  },
}));

function LandingPagePalette({palettes}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <ThemeProvider theme={bodyFont}>
          <div className={classes.root}>
            <Typography align="left" color="inherit" variant="h5" noWrap>
              MatterBoard to START...
            </Typography>
            <Grid className={classes.grid} container spacing={2}>
              {palettes &&
                palettes[0] &&
                palettes.map((item, i) => (
                  <Grid key={i} item xs={6} sm={3}>
                    <LandingPageBackdropImage item={item} />
                  </Grid>
                ))}
            </Grid>
          </div>
        </ThemeProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

LandingPagePalette.propTypes = {
    palettes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      src: PropTypes.string,
      alt: PropTypes.string,
      link: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
    })).isRequired,
};

export default LandingPagePalette;