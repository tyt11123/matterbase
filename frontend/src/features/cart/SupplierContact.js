import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { manuJoin } from "./manuAsyncThunk";
import {
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  bodyFont,
} from "../../components/styles/materialUIStyles";
import TextField from "@material-ui/core/TextField";
import MuiDialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/icons/CheckCircle";
import { red } from "@material-ui/core/colors";
import {
  HighlightButton,
  BlackButton,
} from "../../components/CustomButtons";

const Dialog = withStyles((theme) => ({
  paperScrollPaper: {
    display: "flex",
    flexDirection: "row",
    maxHeight: "calc(100% - 64px)",
  },
}))(MuiDialog);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1, 0),
    display: "flex",
  },
  dialogActions: {
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(1, 3),
  },
  flexBox: {
    flexBasis: "50%",
  },
  dialogTitle: {
    "& *": {
      borderBottom: "1px solid black",
    },
  },
  hint: {
    margin: theme.spacing(0, 1, 3, 1),
    textAlign: "center",
  },
  largeTextMargin: {
    marginBottom: theme.spacing(3),
  },
  largeBottomMargin: {
    width: "100%",
    margin: theme.spacing(1, 1, 3, 1),
  },
  checkbox: {
    color: red[700],
    verticalAlign: "middle",
    marginRight: theme.spacing(1),
  },
}));

export default function ManufacturerJoin() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    title: "",
    companyName: "",
    workEmail: "",
    phone: "",
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
    console.log(values);
    if (Boolean(values.firstName) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.lastName) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.title) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.companyName) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.workEmail.match(/\S+@\S+\.\S+/)) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.phone) === false) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    dispatch(manuJoin(values));
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <HighlightButton
          variant="contained"
          color="primary"
          size="small"
          className={classes.margin}
          onClick={handleClickOpen}
        >
          Manufacturers Join Here
        </HighlightButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-manufacturer"
          maxWidth="md"
          scroll="paper"
        >
          <Box className={classes.flexBox}>
            <DialogTitle
              id="form-dialog-manufacturer"
              className={classes.dialogTitle}
            >
              Drive new business with Matterbase.
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                component="p"
                variant="body2"
                color="textPrimary"
              >
                Matterbase, the world’s largest material marketplace for the architecture and design industry, simplifies the complex process of material search and solves the unique problems of sampling. See why over 340+ brands have already adopted Matterbase to help them grow.
              </DialogContentText>
              <DialogContentText
                component="p"
                variant="body2"
                color="textPrimary"
              >
                Get your products in front of 50,000+ design professionals who are actively sourcing materials for their projects.
              </DialogContentText>
              <DialogContentText
                component="p"
                variant="body2"
                color="textPrimary"
              >
                <Checkbox className={classes.checkbox} />
                Highly qualified leads
              </DialogContentText>
              <DialogContentText
                component="p"
                variant="body2"
                color="textPrimary"
              >
                <Checkbox className={classes.checkbox} />
                Valuable connections for your reps
              </DialogContentText>
              <DialogContentText
                component="p"
                variant="body2"
                color="textPrimary"
              >
                <Checkbox className={classes.checkbox} />
                Massive exposure at no cost
              </DialogContentText>
              <DialogContentText
                component="p"
                variant="body2"
                color="textPrimary"
              >
                <Checkbox className={classes.checkbox} />
                Fastest possible sample logistics
              </DialogContentText>
              <DialogContentText
                component="p"
                variant="body2"
                color="textPrimary"
              >
                <Checkbox className={classes.checkbox} />
                Sample reclamation simplified
              </DialogContentText>
              <DialogContentText
                component="p"
                variant="body2"
                color="textPrimary"
              >
                <Checkbox className={classes.checkbox} />
                Low risk business model
              </DialogContentText>
              <DialogContentText
                component="p"
                variant="body2"
                color="textPrimary"
                className={classes.largeTextMargin}
              >
                <Checkbox className={classes.checkbox} />
                Powerful ROI
              </DialogContentText>
            </DialogContent>
          </Box>
          <Box className={classes.flexBox}>
            <DialogTitle>Let's Talk!</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                error={isUserActionMade && Boolean(values.firstName) === false}
                defaultValue={values.firstName}
                onChange={handleValues("firstName")}
                variant="outlined"
                margin="dense"
                id="name"
                label="First Name"
                fullWidth
              />
              <TextField
                required
                error={isUserActionMade && Boolean(values.lastName) === false}
                defaultValue={values.lastName}
                onChange={handleValues("lastName")}
                variant="outlined"
                margin="dense"
                id="lastname"
                label="Last Name"
                fullWidth
              />
              <TextField
                required
                error={isUserActionMade && Boolean(values.title) === false}
                defaultValue={values.title}
                onChange={handleValues("title")}
                variant="outlined"
                margin="dense"
                id="title"
                label="Your Title"
                fullWidth
              />
              <TextField
                required
                error={
                  isUserActionMade && Boolean(values.companyName) === false
                }
                defaultValue={values.companyName}
                onChange={handleValues("companyName")}
                variant="outlined"
                margin="dense"
                id="company-name"
                label="Company Name"
                fullWidth
              />
              <TextField
                required
                error={
                  isUserActionMade &&
                  Boolean(values.workEmail.match(/\S+@\S+\.\S+/)) === false
                }
                defaultValue={values.workEmail}
                onChange={handleValues("workEmail")}
                variant="outlined"
                margin="dense"
                id="work-email"
                label="Work Email"
                type="email"
                fullWidth
              />
              <TextField
                required
                error={
                  isUserActionMade && Boolean(values.phone) === false
                }
                defaultValue={values.phone}
                onChange={handleValues("phone")}
                variant="outlined"
                margin="dense"
                id="phone"
                label="Phone Number"
                fullWidth
              />
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
              <BlackButton
                variant="contained"
                color="primary"
                className={classes.largeBottomMargin}
                onClick={handleSubmit}
              >
                Submit
              </BlackButton>
            </DialogActions>
            {showHint && (
              <DialogContentText className={classes.hint}>
                Oops! Something is still wrong above.
              </DialogContentText>
            )}
          </Box>
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}
