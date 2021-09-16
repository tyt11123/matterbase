import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  imageCreate,
  imageCreateReset,
  selectImageCreate
} from "./imageAsyncThunk";
import { IKContext, IKUpload } from "imagekitio-react";
import { useSnackbar } from "notistack";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { common } from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: common.white,
  },
}));

function ImageCreate({ label, error, onFinish }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const imageCreateStore = useSelector(selectImageCreate);
  const { payload, imageOwner } = imageCreateStore;
  
  const handleVariant = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant, autoHideDuration: 3000, action, });
  };
  const action = (key) => (
    <React.Fragment>
      <Button
        color="primary"
        size="small"
        onClick={() => closeSnackbar(key)}
      >
        <CheckIcon style={{ color: common.white }}/>
      </Button>
    </React.Fragment>
  );
    
  const onError = err => {
    setIsLoading(false);
    handleVariant("Oops! Server Failure.", "error");
  };
  const onSuccess = res => {
    setIsLoading(false);
    dispatch(imageCreate({ ...res, label }));
  };

  useEffect(() => {
    if (payload.hasOwnProperty("id") && imageOwner === label) {
      onFinish(payload);
      dispatch(imageCreateReset());
    }
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <React.Fragment>
      <IKContext 
        publicKey={process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY} 
        urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL} 
        authenticationEndpoint={`${process.env.REACT_APP_BACKEND_URL}/api/image/auth`} 
      >
        <Typography color={error ? "secondary" : "inherit"} variant="body2">
          {label}
        </Typography>
        <IKUpload
          accept="image/*"
          onChange={(e) => e.target.value ? setIsLoading(true) : setIsLoading(false)}
          onError={onError}
          onSuccess={onSuccess}
        />
      </IKContext>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* ...other SDK components added previously */}
    </React.Fragment>
  );
}

ImageCreate.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  onFinish: PropTypes.func.isRequired,
};

export default ImageCreate;