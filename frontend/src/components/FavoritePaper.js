import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { LeftTextButton } from "./CustomButtons";

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
  title: {
    padding: theme.spacing(1),
    display: "block",
  },
  content: {
    margin: theme.spacing(1,0),
  },
}));

function FavoritePaper({ favorite }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Grid container direction="column" alignContent="center">
          <Grid item xs>
            <Link href={`../material/${favorite.link}`} className={classes.topItem}>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt={favorite.name}
                src={favorite.src}
                />
            </ButtonBase>
            </Link>
          </Grid>
          <Grid item xs>
            <Box className={classes.title}>
              <Typography gutterBottom variant="subtitle1">
                { favorite.brand }
              </Typography>
              <Typography variant="body2" gutterBottom className={classes.content}>
                { favorite.name }
              </Typography>
              <LeftTextButton>
                Add to Matterboard
              </LeftTextButton>
              <LeftTextButton>
                Remove
              </LeftTextButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

FavoritePaper.propTypes = {
  favorite: PropTypes.shape({
    id: PropTypes.number,
    brand: PropTypes.string,
    name: PropTypes.string,
    src: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};

export default FavoritePaper;