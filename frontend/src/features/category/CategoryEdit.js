import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { categoryEdit } from "./categoryAsyncThunk";
import ImageCreate from "../image/ImageCreate";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../../components/styles/materialUIStyles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BlueButton, BlackButton } from "../../components/CustomButtons";

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

function CategoryEdit({ isSelected, data }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = useState({
    id: data.id,
    name: data.name,
    imageURL: data.imageURL,
  });
  const [showHint, setShowHint] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValues = (prop) => (event) => {
    setIsUserActionMade(true);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    setIsUserActionMade(true);
    if (Boolean(values.name) === false) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    dispatch(categoryEdit(values));
  };

  useEffect(() => {
    const { id, name, imageURL } = data;
    setValues({ id, name, imageURL });
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <BlueButton
          variant="contained"
          color="primary"
          disabled={isSelected === false}
          className={classes.margin}
          onClick={handleClickOpen}
        >
          Edit
        </BlueButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-edit-category"
          scroll="body"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle
            id="form-dialog-edit-category"
            className={classes.dialogTitle}
          >
            Edit Category
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              error={isUserActionMade && Boolean(values.name) === false}
              defaultValue={values.name}
              onChange={handleValues("name")}
              variant="outlined"
              margin="dense"
              id="category-name"
              label="Name"
              fullWidth
            />
            <ImageCreate
              label="Image URL"
              onFinish={(image) => setValues({...values, imageURL: image.url})}
            />
            {
              values.imageURL &&
              <img
                className={classes.categoryLogo}
                src={values.imageURL}
                alt="Category"
              />
            }
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <BlackButton
              variant="contained"
              color="primary"
              className={classes.largeBottomMargin}
              onClick={handleSubmit}
            >
              Update Category
            </BlackButton>
          </DialogActions>
          {showHint && (
            <DialogContentText className={classes.hint}>
              Oops! Something is still wrong above.
            </DialogContentText>
          )}
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}

CategoryEdit.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      imageURL: PropTypes.string,
      created_at: PropTypes.object,
      updated_at: PropTypes.object,
    }).isRequired,
};

export default CategoryEdit;