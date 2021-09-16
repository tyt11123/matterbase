import React from "react";
import PropTypes from "prop-types";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { highlight_colour } from "./styles/materialUIStyles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";

const customRed = { ...red, 500: highlight_colour };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
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
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: customRed,
  },
});

function BrandPaper({ index, brand }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          {index % 2 === 0 && <Grid item sm>
            <Link href={brand.link}>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt={brand.alt}
                  src={brand.src}
                  />
              </ButtonBase>
            </Link>
          </Grid>}
          <Grid item xs={12} sm className={classes.margin} container>
            <Grid item xs container direction="column" alignItems="flex-start" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  { brand.title }
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  { brand.subtitle }
                </Typography>
                <Typography variant="body2" gutterBottom>
                  { brand.content }
                </Typography>
              </Grid>
              <Grid item>
                <Link href={brand.link}>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                  >
                    View Materials
                  </Button>
                  </ThemeProvider>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          {index % 2 === 1 && <Grid item sm>
            <Link href={brand.link}>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt={brand.alt}
                src={brand.src}
                />
            </ButtonBase>
            </Link>
          </Grid>}
        </Grid>
      </Paper>
    </div>
  );
}

BrandPaper.propTypes = {
  index: PropTypes.number,
  brand: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    content: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};

export default BrandPaper;