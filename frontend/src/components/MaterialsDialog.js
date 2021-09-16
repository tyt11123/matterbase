import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  categoryGetByID,
  selectCategoryGetByID,
} from "../features/category/categoryAsyncThunk";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { modal_background_colour } from "./styles/materialUIStyles";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AppBarMenuButton from "./AppBarMenuButton";

const useStyles = makeStyles((theme) => ({
  dialog: {
    background: modal_background_colour,
    minHeight: theme.spacing(40),
  },
  links: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  imageURL: {
    position: "sticky",
    top: 0,
    width: "100%",
    objectFit: "cover",
  },
}));

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
    <Box mx={3}>
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h4">{children}</Typography>
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
    </Box>
  );
});

MaterialsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string,
};

export default function MaterialsDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categoryGetByIDStore = useSelector(selectCategoryGetByID);
  const { payload } = categoryGetByIDStore;
  const { onClose, selectedValue, open } = props;
  const [materials, setMaterials] = useState([[],[],[],[]]);
  const [imageURLSrc, setThumbnailSrc] = useState("");
  const [imageURLTitle, setThumbnailTitle] = useState("");
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleItemClick = (value) => {
    onClose(value);
  };
  const handleHoverIn = (material) => {
    setThumbnailSrc(material.imageURL);
    setThumbnailTitle(material.name);
  };
  const handleHoverOut = () => {
    setThumbnailSrc("");
    setThumbnailTitle("");
  };

  useEffect(() => {
    dispatch(categoryGetByID(1));
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let trim = [[], [], [], []];
    if (payload.length > 0) {
      const manipulate = payload.filter((_,i) => i > 0).map(x => {
        return { ...x, url: `/search/category/${x.name}-${x.id}` }
      });
      trim[0] = manipulate.filter((_, i) => i < Math.ceil(manipulate.length / 4));
      trim[1] = manipulate.filter((_, i) =>
        (i >= Math.ceil(manipulate.length / 4) && i < Math.ceil(manipulate.length / 2))
      );
      trim[2] = manipulate.filter((_, i) =>
        (i >= Math.ceil(manipulate.length / 2) && i < Math.ceil(manipulate.length * 3 / 4))
      );
      trim[3] = manipulate.filter((_, i) => i >= Math.ceil(manipulate.length * 3 / 4));
      for (let i = 1; i < 4; i++) {
        while (trim[i].length > 0 && trim[i][0].parent_id !== 1) {
          trim[i - 1].push(trim[i].shift());
        }
      };
      setMaterials([...trim]);
    }
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={open}
      onClose={handleClose}
      aria-labelledby="materials-dialog"
    >
      <DialogTitle onClose={handleClose}>Materials</DialogTitle>
      <DialogContent className={classes.dialog}>
        <Box my={2}>
          <Grid container spacing={0}>
            {materials.map(
              (column, i) =>
                (
                <Grid item xs key={i} className={classes.links}>
                  {
                    column.map(
                      (material, j) => (
                      <Box
                        key={j}
                        onClick={handleItemClick}
                        onPointerEnter={() => handleHoverIn(material)}
                        onFocus={() => handleHoverIn(material)}
                        onPointerLeave={handleHoverOut}
                        onBlur={handleHoverOut}
                      >
                        <AppBarMenuButton {...material} />
                      </Box>
                      )
                    )
                  }
                </Grid>
                )
            )}
            <Grid item xs={3}>
              <img src={imageURLSrc} alt={imageURLTitle} className={classes.imageURL}/>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
