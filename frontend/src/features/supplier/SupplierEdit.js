import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  catalogListCountry,
  catalogListCompanyType,
  selectCatalogListCountry,
  selectCatalogListCompanyType,
} from "../catalog/catalogAsyncThunk";
import { supplierEdit } from "./supplierAsyncThunk";
import ImageCreate from "../image/ImageCreate";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../../components/styles/materialUIStyles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { LightBlueButton, BlackButton } from "../../components/CustomButtons";

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

function SupplierEdit({ isSelected, data }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const catalogListCountryStore = useSelector(selectCatalogListCountry);
  const { isLoading: countryListLoading, payload: countryList } = catalogListCountryStore;
  const catalogListCompanyTypeStore = useSelector(selectCatalogListCompanyType);
  const { isLoading: companyTypeListLoading, payload: companyTypeList } = catalogListCompanyTypeStore;
  const [open, setOpen] = useState(false);
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = useState({
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    telephone: data.telephone,
    companyName: data.companyName,
    companyType: data.companyType,
    company_type_id: data.company_type_id,
    company_type_object: data.company_type_object,
    jobTitle: data.jobTitle,
    country: data.country,
    country_id: data.country_id,
    country_object: data.country_object,
    companyLocation: data.companyLocation,
    companyWebsite: data.companyWebsite,
    supplierLogoURL: data.supplierLogoURL,
    isAgency: data.isAgency,
    isManufacturer: data.isManufacturer,
    isDisabled: data.isDisabled,
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
    dispatch(supplierEdit(values));
  };

  useEffect(() => {
    dispatch(catalogListCountry());
    dispatch(catalogListCompanyType());
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {
      id, firstName, lastName, email, telephone, companyName,
      companyType, company_type_id, company_type_object,
      country, country_id, country_object,
      jobTitle, companyLocation, companyWebsite,
      supplierLogoURL, isAgency, isManufacturer, isDisabled,
    } = data;
    setValues({
      id, firstName, lastName, email, telephone, companyName,
      companyType, company_type_id, company_type_object,
      country, country_id, country_object,
      jobTitle, companyLocation, companyWebsite,
      supplierLogoURL, isAgency, isManufacturer, isDisabled,
    });
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <LightBlueButton
          variant="contained"
          color="primary"
          disabled={isSelected === false}
          className={classes.margin}
          onClick={handleClickOpen}
        >
          Edit
        </LightBlueButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-edit-supplier"
          scroll="body"
          maxWidth="xl"
          fullWidth
        >
          <DialogTitle
            id="form-dialog-edit-supplier"
            className={classes.dialogTitle}
          >
            Edit Supplier
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isDisabled}
                  onChange={(e) =>
                    setValues({ ...values, isDisabled: e.target.checked })
                  }
                  name="isDisabled"
                  color="primary"
                  inputProps={{
                    "aria-label": "Disabled",
                  }}
                />
              }
              label="Disabled"
            />
            <ImageCreate
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
              Update Supplier
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

SupplierEdit.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      telephone: PropTypes.string,
      companyName: PropTypes.string,
      companyType: PropTypes.string,
      company_type_id: PropTypes.number,
      company_type_object: PropTypes.object,
      jobTitle: PropTypes.string,
      country: PropTypes.string,
      country_id: PropTypes.number,
      country_object: PropTypes.object,
      companyLocation: PropTypes.string,
      companyWebsite: PropTypes.string,
      supplierLogoURL: PropTypes.string,
      isAgency: PropTypes.bool,
      isManufacturer: PropTypes.bool,
      isDisabled: PropTypes.bool,
      created_at: PropTypes.object,
      updated_at: PropTypes.object,
    }).isRequired,
};

export default SupplierEdit;