import { withStyles } from "@material-ui/core/styles";
import MuiTextField from "@material-ui/core/TextField";
import MuiDialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

export const DialogTextField = withStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root": {
      color: "rgba(0, 0, 0, 1)",
    },
    "& .MuiFormLabel-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.38)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#3f51b5",
    },
    "& input + fieldset": {
      borderColor: theme.palette.common.black,
      borderWidth: 2,
      borderRadius: 0,
    },
    "& input + * + fieldset": {
      borderColor: theme.palette.common.black,
      borderWidth: 2,
      borderRadius: 0,
    },
  },
}))(MuiTextField);

export const Dialog = withStyles((theme) => ({
  paper: {
    borderRadius: 0,
  },
}))(MuiDialog);

export const DialogTitle = withStyles((theme) => ({
  root: {
    padding: "32px 48px",
  }
}))(MuiDialogTitle);

export const DialogContent = withStyles((theme) => ({
  root: {
    flex: "1 1 auto",
    WebkitOverflowScrolling: "touch",
    // Add iOS momentum scrolling.
    overflowY: "auto",
    padding: "16px 48px",
    "&:first-child": {
      // dialog without title
      paddingTop: 40
    }
  },
  dividers: {
    padding: "32px 48px",
    borderTop: "2px solid ".concat(theme.palette.divider),
    borderBottom: "2px solid ".concat(theme.palette.divider)
  }
}))(MuiDialogContent);

export const DialogActions = withStyles((theme) => ({
  root: {
    padding: 16,
  },
  spacing: {
    "& > :not(:first-child)": {
      marginLeft: 16
    }
  }
}))(MuiDialogActions);
