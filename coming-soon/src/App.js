import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import mainPhoto from "./components/shutterstock_1894351126.jpg";
// import mainPhoto4K from "./components/shutterstock_1894351126_4k.jpg";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import CookiesSnackbar from "./components/CookiesSnackbar";
import { header_background_colour } from "./styles/materialUIStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: header_background_colour,
  },
  // sectionXXL: {
  //   display: "none",
  //   [theme.breakpoints.up("xxl")]: {
  //     display: "flex",
  //   },
  // },
  sectionNormal: {
    display: "flex",
    // [theme.breakpoints.up("xxl")]: {
    //   display: "none",
    // },
  },
  top: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  topImage: {
    width: "100%",
    height: "72vh",
    objectFit: "cover",
    [theme.breakpoints.up("lg")]: {
      height: "100%",
    },
  },
  topBackdrop: {
    position: "absolute",
    zIndex: theme.zIndex.mobileStepper + 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  topTitle: {
    fontFamily: "EB Garamond",
    marginTop: theme.spacing(5),
    color: theme.palette.common.white,
  },
  contentTitle: {
    fontFamily: "EB Garamond",
    marginTop: theme.spacing(3),
    color: theme.palette.common.black,
  },
  contentSubtitle: {
    fontFamily: "EB Garamond",
    marginTop: theme.spacing(10),
    color: theme.palette.common.black,
  },
  contentBody: {
    fontFamily: "Roboto",
    paddingLeft: "20%",
    paddingRight: "20%",
    color: theme.palette.common.black,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        {/* Use 4K image for 4K screen */}
        {/* <div className={classes.sectionXXL}>
          <div className={classes.top}>
            <img
              className={classes.topImage}
              src={mainPhoto4K}
              alt="Matterbase"
            />
            <Backdrop className={classes.topBackdrop} open={true}>
              <Box>
                <Typography className={classes.topTitle} variant="h3" noWrap>
                  Matterbase
                </Typography>
              </Box>
            </Backdrop>
          </div>
        </div> */}
        {/* Use high resolution image for other pages */}
        <div className={classes.sectionNormal}>
          <div className={classes.top}>
            <img
              className={classes.topImage}
              src={mainPhoto}
              alt="Matterbase"
            />
            <Backdrop className={classes.topBackdrop} open={true}>
              <Box>
                <Typography className={classes.topTitle} variant="h3" noWrap>
                  Matterbase
                </Typography>
              </Box>
            </Backdrop>
          </div>
        </div>
        <Typography
          className={classes.contentTitle}
          align="center"
          variant="h3"
          noWrap
        >
          Matterbase
        </Typography>
        <Typography
          className={classes.contentSubtitle}
          align="center"
          variant="h2"
          noWrap
        >
          Coming soon...
        </Typography>
        <Typography
          className={classes.contentBody}
          align="center"
          variant="h4"
          paragraph
        >
          The one-stop material and products platform dedicated for design professionals
        </Typography>
        {/* Subscription Form */}
        <ContactForm />
        <Footer />
        <CookiesSnackbar />
      </div>
    </React.Fragment>
  );
}

export default App;
