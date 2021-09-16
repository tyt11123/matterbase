import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  catalogListCountry,
  catalogListSupplier,
  selectCatalogListCountry,
  selectCatalogListSupplier,
} from "../catalog/catalogAsyncThunk";
import { brandEdit } from "./brandAsyncThunk";
import ImageCreate from "../image/ImageCreate";
import SinglePreviewImageList from "../../components/SinglePreviewImageList";
import { useSnackbar } from "notistack";
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
  brandLogo: {
    width: theme.spacing(10),
    objectFit: "cover",
  },
}));

function BrandEdit({ isSelected, data }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const catalogListCountryStore = useSelector(selectCatalogListCountry);
  const { isLoading: countryListLoading, payload: countryList } = catalogListCountryStore;
  const catalogListSupplierStore = useSelector(selectCatalogListSupplier);
  const { isLoading: supplierListLoading, payload: supplierList } = catalogListSupplierStore;
  const [open, setOpen] = useState(false);
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = useState({
    id: data.id,
    name: data.name,
    country: data.country,
    country_id: data.country_id,
    country_object: data.country_object,
    website: data.website,
    logoURL: data.logoURL,
    supplier: data.supplier,
    supplier_id: data.supplier_id,
    supplier_object: data.supplier_object,
    leftIntro: data.leftIntro,
    rightIntro: data.rightIntro,
    image_ids: data.image_ids,
    image_objects: data.image_objects,
    isSupplier: data.isSupplier,
    isHKOffice: data.isHKOffice,
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
    if (prop === "supplier_object") newObj.supplier_id = newValue.id;
    setValues(newObj);
  };

  const handleImageAdd = (image) => {
    let image_ids = [...values.image_ids];
    let image_objects = [...values.image_objects];
    image_ids.push(image.id);
    image_objects.push(image);
    setValues({ ...values, image_ids, image_objects });
    console.log(image_ids);
  };

  const handleImageRemove = (index) => (event) => {
    let image_ids = [...values.image_ids];
    let image_objects = [...values.image_objects];
    image_ids.splice(index, 1);
    image_objects.splice(index, 1);
    if (image_ids.length > 0) {
      setValues({ ...values, image_ids, image_objects });
    } else {
      enqueueSnackbar("At least 1 picture required!", { message: "info", autoHideDuration: 3000, });
    }
  };

  const handleSubmit = () => {
    setIsUserActionMade(true);
    if (Boolean(values.name) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.website) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.leftIntro) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.rightIntro) === false) {
      setShowHint(true);
      return;
    }
    if (Boolean(values.logoURL) === false) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    dispatch(brandEdit(values));
  };

  useEffect(() => {
    dispatch(catalogListCountry());
    dispatch(catalogListSupplier());
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {
      id, name, website, logoURL,
      supplier, supplier_id, supplier_object,
      country, country_id, country_object,
      leftIntro, rightIntro,
      image_ids, image_objects,
      isSupplier, isHKOffice,
    } = data;
    setValues({
      id, name, website, logoURL,
      supplier, supplier_id, supplier_object,
      country, country_id, country_object,
      leftIntro, rightIntro,
      image_ids, image_objects,
      isSupplier, isHKOffice,
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
          aria-labelledby="form-dialog-edit-brand"
          scroll="body"
          maxWidth="xl"
          fullWidth
        >
          <DialogTitle
            id="form-dialog-edit-brand"
            className={classes.dialogTitle}
          >
            Edit Brand
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
              id="name"
              label="Name"
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
              error={isUserActionMade && Boolean(values.website) === false}
              defaultValue={values.website}
              onChange={handleValues("website")}
              variant="outlined"
              margin="dense"
              id="website"
              label="Website"
              fullWidth
            />
            <Autocomplete
              id="supplier"
              options={supplierList}
              loading={supplierListLoading}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              value={values.supplier_object}
              onChange={handleAutoCompleteValues("supplier_object")}
              fullWidth
              disableClearable
              renderInput={(params) => <TextField {...params} label="Supplier" variant="outlined" />}
            />
            <TextField
              required
              error={isUserActionMade && Boolean(values.leftIntro) === false}
              defaultValue={values.leftIntro}
              onChange={handleValues("leftIntro")}
              variant="outlined"
              margin="dense"
              id="leftintro"
              label="Introduction (Left)"
              helperText="You can enter multiple rows here."
              fullWidth
              multiline
            />
            <TextField
              required
              error={isUserActionMade && Boolean(values.rightIntro) === false}
              defaultValue={values.rightIntro}
              onChange={handleValues("rightIntro")}
              variant="outlined"
              margin="dense"
              id="rightintro"
              label="Introduction (Right)"
              helperText="You can enter multiple rows here."
              fullWidth
              multiline
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isSupplier}
                  onChange={(e) =>
                    setValues({ ...values, isSupplier: e.target.checked })
                  }
                  name="isSupplier"
                  color="primary"
                  inputProps={{
                    "aria-label": "Is Supplier",
                  }}
                  />
                }
              label="Is Supplier"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isHKOffice}
                  onChange={(e) =>
                    setValues({ ...values, isHKOffice: e.target.checked })
                  }
                  name="isHKOffice"
                  color="primary"
                  inputProps={{
                    "aria-label": "Hong Kong Office",
                  }}
                />
              }
              label="Hong Kong Office"
            />
            <ImageCreate
              label="Brand Logo URL"
              error={isUserActionMade && Boolean(values.logoURL) === false}
              onFinish={(image) => setValues({...values, logoURL: image.url})}
            />
            {
              values.logoURL &&
              <img
                className={classes.brandLogo}
                src={values.logoURL}
                alt="Brand Logo"
                />
            }
            <ImageCreate
              label="Image List"
              onFinish={handleImageAdd}
            />
            <SinglePreviewImageList
              image_objects={values.image_objects}
              onRemove={handleImageRemove}
            />
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <BlackButton
              variant="contained"
              color="primary"
              className={classes.largeBottomMargin}
              onClick={handleSubmit}
            >
              Update Brand
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

BrandEdit.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      country: PropTypes.string,
      country_id: PropTypes.number,
      country_object: PropTypes.object,
      website: PropTypes.string,
      logoURL: PropTypes.string,
      supplier: PropTypes.string,
      supplier_id: PropTypes.number,
      supplier_object: PropTypes.object,
      leftIntro: PropTypes.string,
      rightIntro: PropTypes.string,
      image_ids: PropTypes.arrayOf(PropTypes.number),
      image_objects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        thumbnailUrl: PropTypes.string,
        url: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      })),
      isSupplier: PropTypes.bool,
      isHKOffice: PropTypes.bool,
      created_at: PropTypes.object,
      updated_at: PropTypes.object,
    }).isRequired,
};

export default BrandEdit;