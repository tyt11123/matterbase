import React from "react";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Flickity from "react-flickity-component";
import "./styles/flickity.css";
import {
  modal_background_colour
} from "./styles/materialUIStyles";
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  dialog: {
    background: modal_background_colour,
  },
  carousel: {
    display: "block",
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: "50%",
    margin: theme.spacing(0, 2),
  },
}));

const flickityOptions = {
  cellAlign: "left",
  contain: true,
  pageDots: false,
};

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: modal_background_colour,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

FurnitureDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string,
};

export default function FurnitureDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleItemClick = (value) => {
    onClose(value);
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={open}
      onClose={handleClose}
      aria-labelledby="furniture-dialog"
    >
      <DialogTitle onClose={handleClose}>
        Furniture
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <Flickity options={flickityOptions} static>
          <Link href="/furniture" color="inherit">
            <Box onClick={handleItemClick}>
              <img
                className={classes.carousel}
                src="https://placeimg.com/50/50/animals"
                alt="Residential"
              />
              <Typography variant="body2" align="center" noWrap>
                Residential
              </Typography>
            </Box>
          </Link>
          <Link href="/furniture" color="inherit">
            <Box onClick={handleItemClick}>
              <img
                className={classes.carousel}
                src="https://placeimg.com/50/50/nature"
                alt="Commercial"
              />
              <Typography variant="body2" align="center" noWrap>
                Commercial
              </Typography>
            </Box>
          </Link>
          <Link href="/furniture" color="inherit">
            <Box onClick={handleItemClick}>
              <img
                className={classes.carousel}
                src="https://placeimg.com/50/50/architecture"
                alt="Educational"
              />
              <Typography variant="body2" align="center" noWrap>
                Educational
              </Typography>
            </Box>
          </Link>
          <Link href="/furniture" color="inherit">
            <Box onClick={handleItemClick}>
              <img
                className={classes.carousel}
                src="https://placeimg.com/50/50/people"
                alt="Cultural"
              />
              <Typography variant="body2" align="center" noWrap>
                Cultural
              </Typography>
            </Box>
          </Link>
        </Flickity>
      </DialogContent>
    </Dialog>
  );
}
