import React, { useState } from "react";
import PropTypes from "prop-types";
import BrandGet from "./BrandGet";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../../components/styles/materialUIStyles";
import Dialog from "@material-ui/core/Dialog";
import { BlackButton } from "../../components/CustomButtons";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function BrandPreview({ isSelected, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <BlackButton
          variant="contained"
          color="primary"
          disabled={isSelected === false}
          className={classes.margin}
          onClick={handleClickOpen}
        >
          Preview
        </BlackButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-preview-brand"
          scroll="body"
          maxWidth="xl"
          fullWidth
        >
          <BrandGet id={id} />
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}

BrandPreview.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default BrandPreview;