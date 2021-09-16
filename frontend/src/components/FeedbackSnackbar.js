import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectRegSignup,
  selectRegSubscribe,
} from "../features/registration/regAsyncThunk";
import {
  selectAuthLogin,
  selectAuthUserInfo,
} from "../features/authentication/authAsyncThunk";
import {
  selectManuJoin,
} from "../features/manufacturer/manuAsyncThunk";
import {
  selectUserUpdate,
  selectUserEditAdmin,
  selectUserCreateAdmin,
  selectUserManageAdmin,
  selectUserForgetPassword,
  selectUserFinishRecovery,
  selectUserFederatedInfo,
} from "../features/userChange/userAsyncThunk";
import {
  selectCatalogCreateCompanyType,
  selectCatalogManageCompanyType,
} from "../features/catalog/catalogAsyncThunk";
import { selectImageCreate } from "../features/image/imageAsyncThunk";
import {
  selectSupplierCreate,
  selectSupplierEdit,
} from "../features/supplier/supplierAsyncThunk";
import {
  selectBrandCreate,
  selectBrandEdit,
} from "../features/brand/brandAsyncThunk";
import {
  selectCategoryCreate,
  selectCategoryEdit,
  selectCategoryDelete,
} from "../features/category/categoryAsyncThunk";
import { useSnackbar } from "notistack";
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

function FeedbackSnackbar() {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [backdropOpen, setBackdropOpen] = useState(false);
  const regSignup = useSelector(selectRegSignup);
  const regSubscribe = useSelector(selectRegSubscribe);
  const userUpdate = useSelector(selectUserUpdate);
  const userEditAdmin = useSelector(selectUserEditAdmin);
  const userCreateAdmin = useSelector(selectUserCreateAdmin);
  const userManageAdmin = useSelector(selectUserManageAdmin);
  const userForgetPassword = useSelector(selectUserForgetPassword);
  const userFinishRecovery = useSelector(selectUserFinishRecovery);
  const userFederatedInfo = useSelector(selectUserFederatedInfo);
  const authLogin = useSelector(selectAuthLogin);
  const authUserInfo = useSelector(selectAuthUserInfo);
  const catalogCreateCompanyType = useSelector(selectCatalogCreateCompanyType);
  const catalogManageCompanyType = useSelector(selectCatalogManageCompanyType);
  const imageCreate = useSelector(selectImageCreate);
  const supplierCreate = useSelector(selectSupplierCreate);
  const supplierEdit = useSelector(selectSupplierEdit);
  const brandCreate = useSelector(selectBrandCreate);
  const brandEdit = useSelector(selectBrandEdit);
  const categoryCreate = useSelector(selectCategoryCreate);
  const categoryEdit = useSelector(selectCategoryEdit);
  const categoryDelete = useSelector(selectCategoryDelete);
  const manuJoin = useSelector(selectManuJoin);
  const {
    isLoading: regSignupLoading,
    isSuccess: regSignupSuccess,
    isFail: regSignupFail,
  } = regSignup;
  const {
    isLoading: regSubscribeLoading,
    isSuccess: regSubscribeSuccess,
    isFail: regSubscribeFail,
  } = regSubscribe;
  const {
    isLoading: userUpdateLoading,
    successCode: userUpdateSuccess,
    failCode: userUpdateFail,
  } = userUpdate;
  const {
    isLoading: userEditAdminLoading,
    isSuccess: userEditAdminSuccess,
    failCode: userEditAdminFail,
  } = userEditAdmin;
  const {
    isLoading: userCreateAdminLoading,
    isSuccess: userCreateAdminSuccess,
    failCode: userCreateAdminFail,
  } = userCreateAdmin;
  const {
    isLoading: userManageAdminLoading,
    isSuccess: userManageAdminSuccess,
    isFail: userManageAdminFail,
  } = userManageAdmin;
  const {
    isLoading: userForgetPasswordLoading,
    isSuccess: userForgetPasswordSuccess,
    failCode: userForgetPasswordFail,
  } = userForgetPassword;
  const {
    isLoading: userFinishRecoveryLoading,
    isSuccess: userFinishRecoverySuccess,
    isFail: userFinishRecoveryFail,
  } = userFinishRecovery;
  const {
    isLoading: userFederatedInfoLoading,
    isSuccess: userFederatedInfoSuccess,
    isFail: userFederatedInfoFail,
  } = userFederatedInfo;
  const {
    isLoading: catalogCreateCompanyTypeLoading,
    isSuccess: catalogCreateCompanyTypeSuccess,
    isFail: catalogCreateCompanyTypeFail,
  } = catalogCreateCompanyType;
  const {
    isLoading: catalogManageCompanyTypeLoading,
    isSuccess: catalogManageCompanyTypeSuccess,
    isFail: catalogManageCompanyTypeFail,
  } = catalogManageCompanyType;
  const {
    isLoading: imageCreateLoading,
    isSuccess: imageCreateSuccess,
    isFail: imageCreateFail,
  } = imageCreate;
  const {
    isLoading: supplierCreateLoading,
    isSuccess: supplierCreateSuccess,
    failCode: supplierCreateFail,
  } = supplierCreate;
  const {
    isLoading: supplierEditLoading,
    isSuccess: supplierEditSuccess,
    failCode: supplierEditFail,
  } = supplierEdit;
  const {
    isLoading: brandCreateLoading,
    isSuccess: brandCreateSuccess,
    isFail: brandCreateFail,
  } = brandCreate;
  const {
    isLoading: brandEditLoading,
    isSuccess: brandEditSuccess,
    isFail: brandEditFail,
  } = brandEdit;
  const {
    isLoading: categoryCreateLoading,
    isSuccess: categoryCreateSuccess,
    isFail: categoryCreateFail,
  } = categoryCreate;
  const {
    isLoading: categoryEditLoading,
    isSuccess: categoryEditSuccess,
    failCode: categoryEditFail,
  } = categoryEdit;
  const {
    isLoading: categoryDeleteLoading,
    isSuccess: categoryDeleteSuccess,
    failCode: categoryDeleteFail,
  } = categoryDelete;
  const {
    isLoading: authLoginLoading,
    successCode: authLoginSuccess,
    failCode: authLoginFail,
  } = authLogin;
  const {
    isLoading: manuJoinLoading,
    isSuccess: manuJoinSuccess,
    isFail: manuJoinFail,
  } = manuJoin;
  const {
    isLoggedOut,
    isFederatedLoginFail,
  } = authUserInfo;

  const handleVariant = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant, autoHideDuration: 3000, action, });
  };
  const handlePersist = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant, action, persist: true, });
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

  useEffect(() => {
    setBackdropOpen(
      regSignupLoading || regSubscribeLoading ||
      userUpdateLoading || userCreateAdminLoading ||
      authLoginLoading || manuJoinLoading ||
      userEditAdminLoading || userManageAdminLoading ||
      userForgetPasswordLoading || userFinishRecoveryLoading ||
      userFederatedInfoLoading || catalogCreateCompanyTypeLoading ||
      catalogManageCompanyTypeLoading || supplierCreateLoading ||
      supplierEditLoading || brandCreateLoading ||
      brandEditLoading || categoryCreateLoading ||
      categoryEditLoading || categoryDeleteLoading ||
      imageCreateLoading
    );
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    regSignupLoading, regSubscribeLoading,
    userUpdateLoading, userEditAdminLoading,
    userCreateAdminLoading, userManageAdminLoading,
    userForgetPasswordLoading, userFinishRecoveryLoading,
    userFederatedInfoLoading, catalogCreateCompanyTypeLoading,
    catalogManageCompanyTypeLoading, supplierCreateLoading,
    supplierEditLoading, brandCreateLoading,
    brandEditLoading, categoryCreateLoading,
    categoryEditLoading, categoryDeleteLoading,
    imageCreateLoading,
    authLoginLoading, manuJoinLoading,
  ]);
  useEffect(() => {
    if (regSignupSuccess) {
      handlePersist("An Email has been sent to you for verification. Please check.", "success");
    };
    if (regSignupFail) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    regSignupSuccess,
    regSignupFail,
  ]);
  useEffect(() => {
    if (regSubscribeSuccess) {
      handlePersist("An Email has been sent to you for verification. Please check.", "success");
    };
    if (regSubscribeFail) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    regSubscribeSuccess,
    regSubscribeFail,
  ]);
  useEffect(() => {
    if (userUpdateSuccess === 200) {
      handleVariant("Updated!", "success");
    };
    if (userUpdateSuccess === 205) {
      handlePersist("As you changed the email, a new verifying process is needed.", "info");
      handlePersist("An Email has been sent to you for verification. Please check.", "success");
    };
    if (userUpdateFail === 401) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    if (userUpdateFail === 406) {
      handleVariant("Incorrect current password.", "error");
    };
    if (userUpdateFail === 409) {
      handlePersist("The email you requested is already occupied.", "error");
    };
    if (userUpdateFail === 412) {
      handleVariant("Data tampering is crimial!", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userUpdateSuccess,
    userUpdateFail,
  ]);
  useEffect(() => {
    if (userEditAdminSuccess) {
      handleVariant("Updated.", "success");
    };
    if (userEditAdminFail === 401) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    if (userEditAdminFail === 406) {
      handleVariant("Incorrect current password.", "error");
    };
    if (userEditAdminFail === 412) {
      handleVariant("Data tampering is crimial!", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userEditAdminSuccess,
    userEditAdminFail,
  ]);
  useEffect(() => {
    if (userCreateAdminSuccess) {
      handleVariant("New Admin Created.", "success");
    };
    if (userCreateAdminFail === 401) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    if (userCreateAdminFail === 403) {
      handlePersist("Insufficient privilege.", "error");
    };
    if (userCreateAdminFail === 406) {
      handlePersist("Email already occupied.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userCreateAdminSuccess,
    userCreateAdminFail,
  ]);
  useEffect(() => {
    if (userManageAdminSuccess) {
      handleVariant("Updated.", "success");
    };
    if (userManageAdminFail) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userManageAdminSuccess,
    userManageAdminFail,
  ]);
  useEffect(() => {
    if (userForgetPasswordSuccess) {
      handlePersist("The recovery instruction is sent to your email. Please check.", "success");
    };
    if (userForgetPasswordFail === 401) {
      handleVariant("Oops! Something is wrong, please retry.", "error");
    };
    if (userForgetPasswordFail === 406) {
      handleVariant("The Email specified is not registered.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userForgetPasswordSuccess,
    userForgetPasswordFail,
  ]);
  useEffect(() => {
    if (userFinishRecoverySuccess) {
      handleVariant("Password changed successfully.", "success");
    };
    if (userFinishRecoveryFail) {
      handleVariant("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userFinishRecoverySuccess,
    userFinishRecoveryFail,
  ]);
  useEffect(() => {
    if (userFederatedInfoSuccess) {
      handleVariant("Well received and record updated.", "success");
    };
    if (userFederatedInfoFail) {
      handleVariant("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userFederatedInfoSuccess,
    userFederatedInfoFail,
  ]);
  useEffect(() => {
    if (catalogCreateCompanyTypeSuccess) {
      handleVariant("New Company Type Created.", "success");
    };
    if (catalogCreateCompanyTypeFail) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    catalogCreateCompanyTypeSuccess,
    catalogCreateCompanyTypeFail,
  ]);
  useEffect(() => {
    if (catalogManageCompanyTypeSuccess) {
      handleVariant("Updated.", "success");
    };
    if (catalogManageCompanyTypeFail) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    catalogManageCompanyTypeSuccess,
    catalogManageCompanyTypeFail,
  ]);
  useEffect(() => {
    if (imageCreateSuccess) {
      handleVariant("Uploaded.", "success");
    };
    if (imageCreateFail) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    imageCreateSuccess,
    imageCreateFail,
  ]);
  useEffect(() => {
    if (supplierCreateSuccess) {
      handleVariant("New supplier created.", "success");
    };
    if (supplierCreateFail === 401) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    if (supplierCreateFail === 406) {
      handleVariant("Email already occupied.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    supplierCreateSuccess,
    supplierCreateFail,
  ]);
  useEffect(() => {
    if (supplierEditSuccess) {
      handleVariant("Updated.", "success");
    };
    if (supplierEditFail === 401) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    if (supplierEditFail === 406) {
      handleVariant("Email already occupied.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    supplierEditSuccess,
    supplierEditFail,
  ]);
  useEffect(() => {
    if (brandCreateSuccess) {
      handleVariant("New brand created.", "success");
    };
    if (brandCreateFail) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    brandCreateSuccess,
    brandCreateFail,
  ]);
  useEffect(() => {
    if (brandEditSuccess) {
      handleVariant("Updated.", "success");
    };
    if (brandEditFail) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    brandEditSuccess,
    brandEditFail,
  ]);
  useEffect(() => {
    if (categoryCreateSuccess) {
      handleVariant("New category created.", "success");
    };
    if (categoryCreateFail) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryCreateSuccess,
    categoryCreateFail,
  ]);
  useEffect(() => {
    if (categoryEditSuccess) {
      handleVariant("Updated.", "success");
    };
    if (categoryEditFail === 403) {
      handleVariant("Edit of \"Materials\" & \"Furniture\" is not allowed.", "info");
    };
    if (categoryEditFail === 401) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryEditSuccess,
    categoryEditFail,
  ]);
  useEffect(() => {
    if (categoryDeleteSuccess) {
      handleVariant("Updated.", "success");
    };
    if (categoryDeleteFail === 406) {
      handleVariant("Delete of category with children is not allowed.", "info");
    };
    if (categoryDeleteFail === 403) {
      handleVariant("Delete of \"Materials\" & \"Furniture\" is not allowed.", "info");
    };
    if (categoryDeleteFail === 401) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryDeleteSuccess,
    categoryDeleteFail,
  ]);
  useEffect(() => {
    if (authLoginFail === 401) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    if (authLoginFail === 406) {
      handlePersist("Account disabled. Ask your boss why.", "error");
    };
    if (authLoginSuccess === 202) {
      handlePersist("We resent the verification mail. Please verify.", "info");
    };
    if (authLoginSuccess === 200) {
      handleVariant("Welcome back!", "success");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    authLoginSuccess,
    authLoginFail,
  ]);
  useEffect(() => {
    if (isLoggedOut) {
      handleVariant("You have successfully logged out.", "success");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isLoggedOut ]);
  useEffect(() => {
    if (isFederatedLoginFail) {
      handleVariant("Oops! Login fails, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isFederatedLoginFail ]);
  useEffect(() => {
    if (manuJoinSuccess) {
      handlePersist("Well received. We will follow up. Thanks.", "success");
    };
    if (manuJoinFail) {
      handlePersist("Oops! Something is wrong, please retry.", "error");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    manuJoinSuccess,
    manuJoinFail,
  ]);

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}

export default FeedbackSnackbar;
