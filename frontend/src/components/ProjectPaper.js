import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2),
    },
    textAlign: "left",
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
  content: {
    margin: theme.spacing(3,0),
  },
}));

function ProjectPaper({ project }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="column">
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              { project.title }
            </Typography>
            <Typography variant="body2" gutterBottom className={classes.content}>
              { project.content }
            </Typography>
          </Grid>
          <Grid item xs>
            <Link href={project.link}>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt={project.alt}
                src={project.src}
                />
            </ButtonBase>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

ProjectPaper.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};

export default ProjectPaper;