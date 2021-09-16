import React from "react";
import { useSelector } from "react-redux";
import { selectAuthUserInfo } from "../features/authentication/authAsyncThunk";
import RegSubscribe from "../features/registration/RegSubscribe";
import ManufacturerJoin from "../features/manufacturer/ManufacturerJoin";
import { makeStyles, ThemeProvider, } from "@material-ui/core/styles";
import {
  header_background_colour,
  header_title_colour,
  footer_link_colour,
  footer_secondary_colour,
  titleFont,
} from "./styles/materialUIStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import CountryFlag from "react-country-flag";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    background: header_background_colour,
  },
  grow: {
    flexGrow: 1,
  },
  message: {
    margin: theme.spacing(2, 0),
  },
  content: {
    display: "flex",
    justifyContent: "baseline",
    alignItems: "baseline",
  },
  strong: {
    color: header_title_colour,
  },
  heading: {
    display: "flex",
    marginBottom: theme.spacing(1),
  },
  navigation: {
    display: "flex",
    color: footer_link_colour,
  },
  secondary: {
    display: "flex",
    color: footer_secondary_colour,
  },
  countryFlag: {
    marginLeft: theme.spacing(1),
    fontSize: theme.spacing(2),
    lineHeight: theme.spacing(2),
    alignSelf: "center",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "grid",
    },
  },
  sectionMobile: {
    display: "grid",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function BottomAppBar() {
  const classes = useStyles();
  const authUserInfo = useSelector(selectAuthUserInfo);
  const { countryCode, countryName } = authUserInfo;
  
  return (
    <ThemeProvider theme={titleFont}>
      <ThemeProvider theme={titleFont}>
    <div className={classes.grow}>
      <RegSubscribe />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Box className={classes.message}>
            <Typography className={classes.content} variant="h5" noWrap>
              <strong className={classes.strong}>We're here to help.</strong>
            </Typography>
            <Typography className={classes.content} variant="body2" noWrap>
              Call us on 00852 0000 0000
            </Typography>
            <Typography className={classes.content} variant="body2" noWrap>
              or email us at info@materia.com
            </Typography>
          </Box>
        </Toolbar>
        <div className={classes.sectionDesktop}>
          <Toolbar>
            <Grid container spacing={0} className={classes.message}>
              <Grid item xs>
                <Typography className={classes.heading} variant="h6" noWrap>
                  About us
                </Typography>
                <Typography
                  className={classes.navigation}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    About
                  </Link>
                </Typography>
                <Typography
                  className={classes.navigation}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    The team
                  </Link>
                </Typography>
                <Typography
                  className={classes.navigation}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    Join our team
                  </Link>
                </Typography>
                <Typography
                  className={classes.navigation}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    Our partners
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography className={classes.heading} variant="h6" noWrap>
                  Learn more
                </Typography>
                <Typography
                  className={classes.navigation}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    how it works
                  </Link>
                </Typography>
                <Typography
                  className={classes.navigation}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    Sustainability
                  </Link>
                </Typography>
                <Typography
                  className={classes.navigation}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    Q&amp;A
                  </Link>
                </Typography>
                <Typography
                  className={classes.navigation}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    Journal
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography className={classes.heading} variant="h6" noWrap>
                  Follow us
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography className={classes.heading} variant="h6" noWrap>
                  Professional
                </Typography>
                <Typography
                  className={classes.navigation}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    Publish
                  </Link>
                </Typography>
                <Typography
                  className={classes.navigation}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    Press and media
                  </Link>
                </Typography>
                <ManufacturerJoin />
              </Grid>
            </Grid>
          </Toolbar>
        </div>
        <div className={classes.sectionDesktop}>
          <Toolbar>
            <Grid container spacing={0} className={classes.message}>
              <Grid item xs>
                <Typography
                  className={classes.secondary}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    Terms &amp; conditions
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  className={classes.secondary}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    Privacy &amp; cookie policy
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  className={classes.secondary}
                  variant="body2"
                  noWrap
                  >
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault}
                    color="inherit"
                    >
                    Site security
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  className={classes.secondary}
                  variant="body2"
                  noWrap
                  >
                    Your location: {countryName}
                    <CountryFlag
                      countryCode={countryCode}
                      svg
                      className={classes.countryFlag}
                    />
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </div>
      </AppBar>
    </div>
      </ThemeProvider>
    </ThemeProvider>
  );
}
