import React from "react";
import PropTypes from "prop-types";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "./styles/materialUIStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import BrandPaper from "./BrandPaper";

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
  brand: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

function LandingPageBrand({brands}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <ThemeProvider theme={bodyFont}>
          <div className={classes.root}>
            <Typography align="left" color="inherit" variant="h5" noWrap>
              Featured Brands
            </Typography>
            <Grid className={classes.grid} container spacing={2}>
              {brands &&
                brands[0] &&
                brands.map((item, i) => (
                  <BrandPaper key={i} brand={item} index={i}/>
                ))}
            </Grid>
          </div>
        </ThemeProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

LandingPageBrand.propTypes = {
    brands: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      content: PropTypes.string,
      src: PropTypes.string,
      alt: PropTypes.string,
      link: PropTypes.string,
    })).isRequired,
};

export default LandingPageBrand;