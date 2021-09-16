import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../components/styles/materialUIStyles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  backdrop: {
    position: "absolute",
    zIndex: theme.zIndex.mobileStepper + 1,
    color: "#fff",
  },
}));

function LandingPageBackdropImage({ item }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <ThemeProvider theme={bodyFont}>
          <Link href={item.link}>
            <div className={classes.root}>
              <img
                className={classes.image}
                src={item.src}
                alt={item.alt}
                onPointerEnter={handleOpen}
              />
              <Backdrop
                className={classes.backdrop}
                open={open}
                onPointerLeave={handleClose}
              >
                <Box>
                  <Typography color="inherit" variant="h5" noWrap>
                    {item.title}
                  </Typography>
                  <Box mt={1}>
                    <Typography color="inherit" variant="body1" noWrap>
                      {item.content}
                    </Typography>
                  </Box>
                </Box>
              </Backdrop>
            </div>
          </Link>
        </ThemeProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

LandingPageBackdropImage.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    src: PropTypes.string,
    alt: PropTypes.string,
    link: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default LandingPageBackdropImage;
