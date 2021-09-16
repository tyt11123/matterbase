import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  catalogListCountry,
  catalogListSupplier,
  selectCatalogListCountry,
  selectCatalogListSupplier,
} from "../catalog/catalogAsyncThunk";
import { brandCreate } from "./brandAsyncThunk";
import ImageCreate from "../image/ImageCreate";
import SinglePreviewImageList from "../../components/SinglePreviewImageList";
import { useSnackbar } from "notistack";
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
  brandLogo: {
    width: theme.spacing(10),
    objectFit: "cover",
  },
}));

export default function BrandCreate() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const catalogListCountryStore = useSelector(selectCatalogListCountry);
  const { isLoading: countryListLoading, payload: countryList } = catalogListCountryStore;
  const catalogListSupplierStore = useSelector(selectCatalogListSupplier);
  const {
    isLoading: supplierListLoading,
    isFail: supplierListFail,
    payload: supplierList
  } = catalogListSupplierStore;
  const [open, setOpen] = useState(false);
  const [isUserActionMade, setIsUserActionMade] = useState(false);
  const [values, setValues] = useState({
    name: "",
    country_id: 0,
    country_object: {},
    website: "",
    logoURL: "",
    supplier_id: 0,
    supplier_object: {},
    leftIntro: "",
    rightIntro: "",
    image_ids: [],
    image_objects: [],
    isSupplier: false,
    isHKOffice: false,
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
    dispatch(brandCreate(values));
  };

  useEffect(() => {
    dispatch(catalogListCountry());
    dispatch(catalogListSupplier());
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countryList[99])
      setValues({
        ...values,
        country_object: { ...countryList[99] },
        country_id: countryList[99].id,
      })
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryList]);

  useEffect(() => {
    if (supplierList[0])
      setValues({
        ...values,
        supplier_object: { ...supplierList[0] },
        supplier_id: supplierList[0].id,
      })
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierList]);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <BlueButton
          variant="contained"
          color="primary"
          className={classes.margin}
          onClick={handleClickOpen}
          disabled={supplierListLoading || supplierListFail}
        >
          {
            supplierListFail ?
              "Create a Supplier first before the Brand!" :
              "Create Brand"
          }
        </BlueButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-create-brand"
          scroll="body"
          maxWidth="xl"
          fullWidth
        >
          <DialogTitle id="form-dialog-create-brand" className={classes.dialogTitle}>
            Create New Brand
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
              error={isUserActionMade && values.image_ids.length < 1}
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
              Create Brand
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