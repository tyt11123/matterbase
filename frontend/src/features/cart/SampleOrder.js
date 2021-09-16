import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "./styles/materialUIStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
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

function SampleOrder({collection}) {
  const classes = useStyles();
  const { title, index, variation } = collection;
  const [item, setItem] = useState(variation[index]);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <ThemeProvider theme={bodyFont}>
          <Container>
            <Grid className={classes.grid} container>
              <Grid item xs={12} sm={6}>
                <Paper>
                  <img
                   src={item.src} 
                   alt={item.alt}
                   className={classes.brand}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography align="left" color="inherit" variant="h5" noWrap>
                  Featured Brands
                </Typography>
              </Grid>
              <Grid item xs></Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

SampleOrder.propTypes = {
    collection: PropTypes.shape({
      id : PropTypes.number,
      title: PropTypes.string,
      index: PropTypes.number,
      variation: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        content: PropTypes.string,
        src: PropTypes.string,
        alt: PropTypes.string,
      }))
    }).isRequired,
};

export default SampleOrder;