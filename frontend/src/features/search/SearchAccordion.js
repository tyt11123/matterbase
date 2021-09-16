import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import MuiFormControlLabel from "@material-ui/core/FormControlLabel";
import MuiFormControl from "@material-ui/core/FormControl";
import MuiFormLabel from "@material-ui/core/FormLabel";
import MuiTooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Fade from "@material-ui/core/Fade";
import MuiBox from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TextButton, HighlightButton } from "../../components/CustomButtons";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Box = withStyles((theme) => ({
  root: {
    position: "fixed",
    top: `30%`,
    left: `25%`,
    width: `50%`,
    zIndex: theme.zIndex.appBar - 1,
  },
}))(MuiBox);

const FormControl = withStyles({
  root: {
    width: "100%",
  },
})(MuiFormControl);

const FormLabel = withStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}))(MuiFormLabel);

const FormControlLabel = withStyles({
  label: {
    display: "inline-grid",
  },
})(MuiFormControlLabel);

const Tooltip = withStyles({
  tooltip: {
    textTransform: "capitalize",
  },
})(MuiTooltip);

const Accordion = withStyles({
  root: {
    border: "unset",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {
    width: "100%",
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderTop: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    textTransform: "uppercase",
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textTransform: "capitalize",
  },
}))(MuiAccordionDetails);

const DialogTitle = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    alignSelf: 'center',
  },
  closeButton: {
    color: theme.palette.grey[500],
  },
}))((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={classes.title}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function SearchAccordion({ criteria }) {
  const [legend, setLegend] = useState([]);
  const [choice, setChoice] = useState([]);
  const [isExpanded, setIsExpanded] = useState([]);
  const [autoCompleteKey, setAutoCompleteKey] = useState([]);
  const [query, setQuery] = useState({});
  const [open, setOpen] = useState(false);
  const choiceThreshold = 10;
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (index) => (event) => {
    handleClickOpen();
    const newChoice = [...choice];
    newChoice[index] = { ...choice[index], [event.target.name]: event.target.checked };
    setChoice(newChoice);
    const newQuery = {};
    const queryValues = newChoice.map(choiceObject => {
      const filteredItem = Object.entries(choiceObject).filter(([item, isSelected]) => isSelected);
      return filteredItem.map(array => array[0]);
    });
    for (let i = 0; i < queryValues.length; i++) {
      if (queryValues[i].length > 0) newQuery[legend[i]] = [...queryValues[i]];
    };
    for (let i = 0; i < legend.length; i++) {
      if (Object.keys(choice[i]).length > choiceThreshold)
        if (Array.isArray(query[legend[i]]))
          newQuery[legend[i]] = [...query[legend[i]]];
    };
    setQuery(newQuery);
  };

  const handleAutocomplete = ({ key, value }) => {
    handleClickOpen();
    const optionSelected = { ...query };
    if (Array.isArray(value)) {
      value.length > 0 ? optionSelected[key] = [...value] : delete optionSelected[key];
    };
    setQuery(optionSelected);
  };

  const handleExpand = (panel) => (event) => {
    let newIsExpanded = [...isExpanded];
    newIsExpanded[panel] = !newIsExpanded[panel];
    setIsExpanded(newIsExpanded);
  };

  const handleClear = () => {
    const key = [...legend];
    const option = Object.values(criteria);
    const manipulatedKey = key.map((x) => {
      return `${x}${Math.random().toString().substring(15)}`
    });
    const manipulatedOption = option.map((x) => {
      const obj = {};
      for (let i = 0; i < x.length; i++) {
        obj[x[i]] = false;
      };
      return obj;
    });
    setAutoCompleteKey(manipulatedKey);
    setChoice(manipulatedOption);
    setQuery({});
    handleClose();
  };

  const handleSubmit = () => {
    console.log(query);
    setOpen(false);
  };

  useEffect(() => {
    const key = Object.keys(criteria);
    const option = Object.values(criteria);
    const manipulatedKey = key.map((x) => {
      return `${x}${Math.random().toString().substring(15)}`
    });
    const manipulatedOption = option.map((x) => {
      const obj = {};
      for (let i = 0; i < x.length; i++) {
        obj[x[i]] = false;
      };
      return obj;
    });
    const expanded = key.map((_) => {
      return true;
    });
    setLegend(key);
    setAutoCompleteKey(manipulatedKey);
    setChoice(manipulatedOption);
    setIsExpanded(expanded);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {legend[0] ? (
        legend.map((_, i) => (
          <div key={i}>
            <FormControl component="fieldset">
              <Accordion expanded={isExpanded[i]} onChange={handleExpand(i)}>
                <AccordionSummary
                  aria-controls={legend[i]}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <FormLabel component="legend">{legend[i]}</FormLabel>
                </AccordionSummary>
                <AccordionDetails>
                  {
                    Object.keys(choice[i]).length > choiceThreshold ?
                      <Autocomplete
                        key={autoCompleteKey[i]}
                        multiple
                        fullWidth
                        options={Object.keys(choice[i])}
                        getOptionLabel={(x) => x}
                        disableCloseOnSelect
                        renderOption={(option, { selected }) => (
                          <React.Fragment>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            <span style={{textTransform: "capitalize"}}>
                              {option}
                            </span>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={legend[i]}
                          />
                        )}
                        onChange={(_, value) => handleAutocomplete({ key: legend[i], value })}
                      />
                      :
                      <FormGroup>
                        {Object.entries(choice[i]).map(([item, isSelected], j) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isSelected}
                                onChange={handleChange(i)}
                                name={item}
                                icon={<RadioButtonUncheckedIcon fontSize="small"/>}
                                checkedIcon={<RadioButtonCheckedIcon fontSize="small"/>}
                              />
                            }
                            label={
                              <Tooltip title={item} placement="right">
                                <Typography variant="caption" component="p" noWrap>
                                  {item}
                                </Typography>
                              </Tooltip>
                            }
                            key={j}
                          />
                        ))}
                      </FormGroup>
                  }
                </AccordionDetails>
              </Accordion>
            </FormControl>
          </div>
        ))
      ) : (
        <CircularProgress color="inherit" />
      )}
      <Fade in={open} timeout={350}>
        <Box>
          <Paper elevation={4}>
              <DialogTitle
                onClose={handleClose}
              >
                Confirm?
              </DialogTitle>
              <DialogContent dividers>
              {
                Object.entries(query).length > 0 ?
                  Object.entries(query).map(([key, value]) =>
                    <Typography gutterBottom key={key}>
                      {key}: {value.join(', ')}
                    </Typography>
                  ) :
                  <Typography gutterBottom>Nothing Specified</Typography>
                }
              </DialogContent>
              <DialogActions>
                <TextButton autoFocus onClick={handleClear} color="primary">
                  Clear All Criteria
                </TextButton>
                <HighlightButton autoFocus onClick={handleSubmit} color="primary">
                  Apply
                </HighlightButton>
              </DialogActions>
          </Paper>
        </Box>
      </Fade>
    </React.Fragment>
  );
}

SearchAccordion.propTypes = {
  criteria: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default SearchAccordion;
