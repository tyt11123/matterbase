import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import FiberNewIcon from "@material-ui/icons/FiberNewRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "left",
  },
  topItem: {
    height: 1000,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "cover",
  },
  new: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(0.5),
    position: "absolute",
    top: 0,
    left: theme.spacing(0.5),
  },
  title: {
    padding: theme.spacing(1),
    display: "block",
  },
  content: {
    margin: theme.spacing(1,0),
  },
}));

function SearchPaper({ material }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Grid container direction="column" alignContent="center">
          <Grid item xs>
            <Link href={`../material/${material.link}`} className={classes.topItem}>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt={material.collection}
                src={material.src}
                />
              {
                new Date() - new Date(material.created_at) < 864000000 &&
                <FiberNewIcon className={classes.new} fontSize="large" color="secondary" />
              }
            </ButtonBase>
            </Link>
          </Grid>
          <Grid item xs>
            <Link href={`../material/${material.link}`} className={classes.topItem} color="inherit">
              <Box className={classes.title}>
                <Typography gutterBottom variant="subtitle1">
                  { material.brand }
                </Typography>
                <Typography variant="body2" gutterBottom className={classes.content}>
                  { material.collection }
                </Typography>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

SearchPaper.propTypes = {
  material: PropTypes.shape({
    id: PropTypes.number,
    brand: PropTypes.string,
    collection: PropTypes.string,
    src: PropTypes.string,
    link: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
};

export default SearchPaper;