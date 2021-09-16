import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { brandGetByID, selectBrandGet } from "./brandAsyncThunk";
import SingleLineImageList from "../../components/SingleLineImageList";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f2e2d3",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  brandLogo: {
    maxWidth: "50%",
    maxHeight: theme.spacing(10),
    objectFit: "cover",
  },
  intro: {
    whiteSpace: "pre-line",
  },
  imageList: {
    backgroundColor: "#f2e2d3",
  },
}));

function BrandGet({ id }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const brandGetStore = useSelector(selectBrandGet);
  const { payload } = brandGetStore;

  useEffect(() => {
    dispatch(brandGetByID(id));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false} className={classes.root}>
        {
          payload && payload.image_objects ?
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <img 
                src={payload.logoURL} 
                alt={payload.name}
                className={classes.brandLogo} 
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                className={classes.intro}
              >
                {payload.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body2"
                className={classes.intro}
              >
                {payload.leftIntro}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body2"
                className={classes.intro}
              >
                {payload.rightIntro}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                className={classes.intro}
              >
                <Link
                  href={payload.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  underline="always"
                >
                  <b>Learn more from this brand</b>
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SingleLineImageList
                image_objects={payload.image_objects}
                className={classes.imageList}
              />
            </Grid>
          </Grid> :
          <CircularProgress color="inherit" />
        }
      </Container>
    </React.Fragment>
  );
}

BrandGet.propTypes = {
  id: PropTypes.number.isRequired,
};

export default BrandGet;
