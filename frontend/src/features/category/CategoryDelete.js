import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { categoryDelete } from "./categoryAsyncThunk";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../../components/styles/materialUIStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { LightBlueButton, HighlightButton, BlackButton } from "../../components/CustomButtons";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  dialogActions: {
    justifyContent: "center",
    flexDirection: "column",
  },
  dialogTitle: {
    "& *": {
      borderBottom: "1px solid black",
    },
  },
  smallBottomMargin: {
    width: "70%",
    margin: theme.spacing(1),
  },
  largeBottomMargin: {
    width: "70%",
    margin: theme.spacing(1, 1, 3, 1),
  },
  hint: {
    margin: theme.spacing(0, 1, 1, 1),
    textAlign: "center",
  },
  categoryLogo: {
    width: theme.spacing(10),
    objectFit: "cover",
  },
}));

function CategoryDelete({ isSelected, data }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(categoryDelete(data.id));
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
          Delete
        </BlackButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-delete-category"
          scroll="body"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            id="form-dialog-delete-category"
            className={classes.dialogTitle}
          >
            Delete Category ({data.fullname})
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Are You Sure?</DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <HighlightButton
              variant="contained"
              color="primary"
              className={classes.smallBottomMargin}
              onClick={handleSubmit}
            >
              Confirm
            </HighlightButton>
            <LightBlueButton
              variant="contained"
              color="primary"
              className={classes.largeBottomMargin}
              onClick={handleClose}
            >
              Cancel
            </LightBlueButton>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}

CategoryDelete.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      fullname: PropTypes.string,
    }).isRequired,
};

export default CategoryDelete;