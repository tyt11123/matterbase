import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import regSignupReducer from '../features/registration/regSignupSlice';
import regVerifyRegistrationReducer from '../features/registration/regVerifyRegistrationSlice';
import regVerifySubscriptionReducer from '../features/registration/regVerifySubscriptionSlice';
import regSubscribeReducer from '../features/registration/regSubscribeSlice';
import userUpdateReducer from '../features/userChange/userUpdateSlice';
import userEditAdminReducer from '../features/userChange/userEditAdminSlice';
import userCreateAdminReducer from '../features/userChange/userCreateAdminSlice';
import userListAdminReducer from '../features/userChange/userListAdminSlice';
import userManageAdminReducer from '../features/userChange/userManageAdminSlice';
import userForgetPasswordReducer from '../features/userChange/userForgetPasswordSlice';
import userVerifyRecoveryReducer from '../features/userChange/userVerifyRecoverySlice';
import userFinishRecoveryReducer from '../features/userChange/userFinishRecoverySlice';
import userFederatedInfoReducer from '../features/userChange/userFederatedInfoSlice';
import authLoginReducer from '../features/authentication/authLoginSlice';
import authUserInfoReducer from '../features/authentication/authUserInfoSlice';
import catalogCreateCompanyTypeReducer from '../features/catalog/catalogCreateCompanyTypeSlice';
import catalogListCompanyTypeReducer from '../features/catalog/catalogListCompanyTypeSlice';
import catalogManageCompanyTypeReducer from '../features/catalog/catalogManageCompanyTypeSlice';
import catalogListCountryReducer from '../features/catalog/catalogListCountrySlice';
import catalogListSupplierReducer from '../features/catalog/catalogListSupplierSlice';
import imageCreateReducer from '../features/image/imageCreateSlice';
import supplierCreateReducer from '../features/supplier/supplierCreateSlice';
import supplierListReducer from '../features/supplier/supplierListSlice';
import supplierEditReducer from '../features/supplier/supplierEditSlice';
import supplierGetReducer from '../features/supplier/supplierGetSlice';
import brandCreateReducer from '../features/brand/brandCreateSlice';
import brandListReducer from '../features/brand/brandListSlice';
import brandEditReducer from '../features/brand/brandEditSlice';
import brandGetReducer from '../features/brand/brandGetSlice';
import categoryCreateReducer from '../features/category/categoryCreateSlice';
import categoryListReducer from '../features/category/categoryListSlice';
import categoryEditReducer from '../features/category/categoryEditSlice';
import categoryDeleteReducer from '../features/category/categoryDeleteSlice';
import categoryGetByIDReducer from '../features/category/categoryGetByIDSlice';
import manuJoinReducer from '../features/manufacturer/manuJoinSlice';

export default configureStore({
  reducer: {
    regSignup: regSignupReducer,
    regVerifyRegistration: regVerifyRegistrationReducer,
    regVerifySubscription: regVerifySubscriptionReducer,
    regSubscribe: regSubscribeReducer,
    userUpdate: userUpdateReducer,
    userEditAdmin: userEditAdminReducer,
    userCreateAdmin: userCreateAdminReducer,
    userListAdmin: userListAdminReducer,
    userManageAdmin: userManageAdminReducer,
    userForgetPassword: userForgetPasswordReducer,
    userVerifyRecovery: userVerifyRecoveryReducer,
    userFinishRecovery: userFinishRecoveryReducer,
    userFederatedInfo: userFederatedInfoReducer,
    authLogin: authLoginReducer,
    authUserInfo: authUserInfoReducer,
    catalogCreateCompanyType: catalogCreateCompanyTypeReducer,
    catalogListCompanyType: catalogListCompanyTypeReducer,
    catalogManageCompanyType: catalogManageCompanyTypeReducer,
    catalogListCountry: catalogListCountryReducer,
    catalogListSupplier: catalogListSupplierReducer,
    imageCreate: imageCreateReducer,
    supplierCreate: supplierCreateReducer,
    supplierEdit: supplierEditReducer,
    supplierList: supplierListReducer,
    supplierGet: supplierGetReducer,
    brandCreate: brandCreateReducer,
    brandEdit: brandEditReducer,
    brandList: brandListReducer,
    brandGet: brandGetReducer,
    categoryCreate: categoryCreateReducer,
    categoryEdit: categoryEditReducer,
    categoryList: categoryListReducer,
    categoryDelete: categoryDeleteReducer,
    categoryGetByID: categoryGetByIDReducer,
    manuJoin: manuJoinReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
