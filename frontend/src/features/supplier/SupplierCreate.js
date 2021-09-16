import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  catalogListCountry,
  catalogListCompanyType,
  selectCatalogListCountry,
  selectCatalogListCompanyType,
} from "../catalog/catalogAsyncThunk";
import { supplierCreate } from "./supplierAsyncThunk";
import ImageCreate from "../image/ImageCreate";
import {
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  bodyFont,
} from "../../components/styles/materialUIStyles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  BlueButton,
  BlackButton,
} from "../../components/CustomButtons";

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
  supplierLogo: {
    width: theme.spacing(10),
    objectFit: "cover",
  },
}));

export default function SupplierCreate() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const catalogListCountryStore = useSelector(selectCatalogListCountry);
  const { isLoading: countryListLoading, payload: countryList } = catalogListCountryStore;
  const catalogListCompanyTypeStore = useSelector(selectCatalogListCompanyType);
  const { isLoading: companyTypeListLoading, payload: companyTypeList } = catalogListCompanyTypeStore;
  const [open, setOpen] = useState(false);
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    companyName: "",
    company_type_id: 1,
    company_type_object: {},
    jobTitle: "",
    country_id: 100,
    country_object: {},
    companyLocation: "",
    companyWebsite: "",
    supplierLogoURL: "",
    isAgency: false,
    isManufacturer: false,
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

  const handleAutoCompleteValues = (prop) => (_, newValue) => {
    setIsUserActionMade(true);
    const newObj = { ...values, [prop]: newValue };
    if (prop === "country_object") newObj.country_id = newValue.id;
    if (prop === "company_type_object") newObj.company_type_id = newValue.id;
    setValues(newObj);
  };

  const handleSubmit = () => {
    setIsUserActionMade(true);
    if (Boolean(values.firstName) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.lastName) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.email.match(/\S+@\S+\.\S+/)) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.telephone) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.companyName) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.jobTitle) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.companyLocation) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.companyWebsite) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.supplierLogoURL) === false) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    dispatch(supplierCreate(values));
  };

  useEffect(() => {
    dispatch(catalogListCountry());
    dispatch(catalogListCompanyType());
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countryList[99]) setValues({...values, country_object: {...countryList[99]}})
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryList]);

  useEffect(() => {
    if (companyTypeList[0]) setValues({...values, company_type_object: {...companyTypeList[0]}})
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyTypeList]);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <BlueButton
          variant="contained"
          color="primary"
          className={classes.margin}
          onClick={handleClickOpen}
        >
          Create Supplier
        </BlueButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-create-supplier"
          scroll="body"
          maxWidth="xl"
          fullWidth
        >
          <DialogTitle id="form-dialog-create-supplier" className={classes.dialogTitle}>
            Create New Supplier
          </DialogTitle>
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
              error={isUserActionMade && Boolean(values.email.match(/\S+@\S+\.\S+/)) === false}
              defaultValue={values.email}
              onChange={handleValues("email")}
              variant="outlined"
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              required
              error={isUserActionMade && Boolean(values.telephone) === false}
              defaultValue={values.telephone}
              onChange={handleValues("telephone")}
              variant="outlined"
              margin="dense"
              id="telephone"
              label="Telephone"
              fullWidth
            />
            <TextField
              required
              error={isUserActionMade && Boolean(values.companyName) === false}
              defaultValue={values.companyName}
              onChange={handleValues("companyName")}
              variant="outlined"
              margin="dense"
              id="companyname"
              label="Company Name"
              fullWidth
            />
            <Autocomplete
              id="companytype"
              options={companyTypeList}
              loading={companyTypeListLoading}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              value={values.company_type_object}
              onChange={handleAutoCompleteValues("company_type_object")}
              fullWidth
              disableClearable
              renderInput={(params) => <TextField {...params} label="Company Type" variant="outlined" />}
            />
            <TextField
              required
              error={isUserActionMade && Boolean(values.jobTitle) === false}
              defaultValue={values.jobTitle}
              onChange={handleValues("jobTitle")}
              variant="outlined"
              margin="dense"
              id="jobtitle"
              label="Job title"
              fullWidth
            />
            <Autocomplete
              id="country"
              options={countryList}
              loading={countryListLoading}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              value={values.country_object}
              onChange={handleAutoCompleteValues("country_object")}
              fullWidth
              disableClearable
              renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
            />
            <TextField
              required
              error={isUserActionMade && Boolean(values.companyLocation) === false}
              defaultValue={values.companyLocation}
              onChange={handleValues("companyLocation")}
              variant="outlined"
              margin="dense"
              id="companylocation"
              label="Company Location"
              fullWidth
            />
            <TextField
              required
              error={isUserActionMade && Boolean(values.companyWebsite) === false}
              defaultValue={values.companyWebsite}
              onChange={handleValues("companyWebsite")}
              variant="outlined"
              margin="dense"
              id="companywebsite"
              label="Company Website"
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isAgency}
                  onChange={(e) =>
                    setValues({ ...values, isAgency: e.target.checked })
                  }
                  name="isAgency"
                  color="primary"
                  inputProps={{
                    "aria-label": "Agency",
                  }}
                  />
                }
              label="Agency"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isManufacturer}
                  onChange={(e) =>
                    setValues({ ...values, isManufacturer: e.target.checked })
                  }
                  name="isManufacturer"
                  color="primary"
                  inputProps={{
                    "aria-label": "Manufacturer",
                  }}
                />
              }
              label="Manufacturer"
            />
            <ImageCreate
              id="test1"
              label="Supplier Logo URL"
              error={isUserActionMade && Boolean(values.supplierLogoURL) === false}
              onFinish={(image) => setValues({...values, supplierLogoURL: image.url})}
            />
            {
              values.supplierLogoURL &&
              <img
                className={classes.supplierLogo}
                src={values.supplierLogoURL}
                alt="Supplier Logo"
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
              Create Supplier
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