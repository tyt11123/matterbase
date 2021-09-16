import Button from "@material-ui/core/Button";
import MuiFab from '@material-ui/core/Fab';
import { highlight_colour } from "./styles/materialUIStyles";
import { withStyles } from "@material-ui/core/styles";
import { red, grey, lightBlue, common } from "@material-ui/core/colors";

const customRed = { ...red, 500: highlight_colour };
const customGrey = { ...grey, 500: common.black };
const customWhite = { ...grey, 100: common.white };

export const WhiteButton = withStyles((theme) => ({
  root: {
    borderRadius: 0,
    color: theme.palette.common.black,
    textTransform: "none",
    backgroundColor: customWhite[100],
    "&:hover": {
      backgroundColor: customWhite[200],
    },
  },
}))(Button);

export const HighlightButton = withStyles((theme) => ({
  root: {
    borderRadius: 0,
    color: theme.palette.common.white,
    textTransform: "none",
    backgroundColor: customRed[500],
    "&:hover": {
      backgroundColor: customRed[900],
    },
  },
}))(Button);

export const BlackButton = withStyles((theme) => ({
  root: {
    borderRadius: 0,
    color: theme.palette.common.white,
    textTransform: "none",
    backgroundColor: customGrey[500],
    "&:hover": {
      backgroundColor: customGrey[800],
    },
  },
}))(Button);

export const BlueButton = withStyles((theme) => ({
  root: {
    borderRadius: 0,
    color: theme.palette.common.white,
    textTransform: "none",
    backgroundColor: lightBlue[900],
    "&:hover": {
      backgroundColor: lightBlue[800],
    },
  },
}))(Button);

export const LightBlueButton = withStyles((theme) => ({
  root: {
    borderRadius: 0,
    color: theme.palette.common.white,
    textTransform: "none",
    backgroundColor: lightBlue[700],
    "&:hover": {
      backgroundColor: lightBlue[600],
    },
  },
}))(Button);

export const TextButton = withStyles((theme) => ({
  root: {
    borderRadius: 0,
    textTransform: "none",
  },
}))(Button);

export const LeftTextButton = withStyles((theme) => ({
  root: {
    borderRadius: 0,
    textTransform: "none",
    display: "block",
  },
  text: {
    padding: '6px 0px'
  },
  label: {
    width: '100%',
    display: 'table-row',
    alignItems: 'inherit',
    justifyContent: 'inherit'
  },
}))(Button);

export const HighlightFab = withStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: theme.zIndex.mobileStepper + 1,
    textTransform: "none",
    backgroundColor: customRed[500],
    "&:hover": {
      backgroundColor: customRed[900],
    },
  },
}))(MuiFab);