import React from "react";
import PropTypes from "prop-types";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../components/styles/materialUIStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProjectPaper from "./ProjectPaper";

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
  materials: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  card: {
    width: "100%",
  },
  cardimg: {
    minHeight: 140,
    maxHeight: 300,
  },
}));

function LandingPageProject({ projects }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <ThemeProvider theme={bodyFont}>
          <div className={classes.root}>
            <Typography align="left" color="inherit" variant="h5" noWrap>
              Projects
            </Typography>
            <Grid className={classes.grid} container spacing={2}>
              {projects &&
                projects[0] &&
                projects.map((item, i) => (
                  <Grid key={i} item xs={12} sm={3}>
                    <ProjectPaper project={item} />
                  </Grid>
                ))}
            </Grid>
          </div>
        </ThemeProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

LandingPageProject.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      src: PropTypes.string,
      alt: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default LandingPageProject;
