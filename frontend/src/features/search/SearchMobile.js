import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  makeStyles,
  withStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { bodyFont } from "../../components/styles/materialUIStyles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Autocomplete from '@material-ui/lab/Autocomplete';
import MuiTextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
  HighlightFab,
} from "../../components/CustomButtons";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const TextField = withStyles({
  root: {
    textTransform: "capitalize",
  },
})(MuiTextField);

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  listItem: {
    flexDirection: "column",
    alignItems: "baseline",
    "& a": {
      alignSelf: "center",
    },
  },
  margin: {
    margin: theme.spacing(1, 0),
  },
  fullWidth: {
    width: "100%",
  },
  capitalize: {
    textTransform: "capitalize",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SearchMobile({ criteria }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [legend, setLegend] = useState([]);
  const [choice, setChoice] = useState([]);
  const [query, setQuery] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = ({ key, value }) => {
    const optionSelected = { ...query };
    if (Array.isArray(value)) {
      value.length > 0 ? optionSelected[key] = [...value] : delete optionSelected[key];
    };
    setQuery(optionSelected);
  };

  const handleSubmit = () => {
    console.log(query);
    handleClose();
  };

  useEffect(() => {
    setLegend(Object.keys(criteria));
    setChoice(Object.values(criteria));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <HighlightFab
          aria-label="criteria"
          variant="extended"
          color="primary"
          className={classes.margin}
          onClick={handleClickOpen}
        >
          <FilterListIcon />&nbsp;Refine Criteria
        </HighlightFab>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Refine Search Criteria
              </Typography>
              <Button autoFocus color="inherit" onClick={handleSubmit}>
                Submit
              </Button>
            </Toolbar>
          </AppBar>
          <List dense>
            {
              Array.isArray(legend) &&
              legend.map((_, i) => ( 
                <div key={i} className={classes.fullWidth}>
                  <ListItem className={classes.listItem}>
                    <Autocomplete
                      multiple
                      fullWidth
                      options={choice[i]}
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
                          <span className={classes.capitalize}>
                            {option}
                          </span>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label={legend[i]}
                        />
                      )}
                      onChange={(_, value) => handleChange({ key: legend[i], value })}
                    />
                  </ListItem>
                </div>
              ))
            }
          </List>
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}

SearchMobile.propTypes = {
  criteria: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};
  
export default SearchMobile;