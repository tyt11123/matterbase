import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch, } from "react-redux";
import {
  authUserInfo,
  authPreflight,
  authUserLocation,
  selectAuthLogin,
  selectAuthUserInfo,
} from "./features/authentication/authAsyncThunk";
import axios from "axios";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import BottomAppBar from "./components/BottomAppBar";
import CookiesSnackbar from "./components/CookiesSnackbar";
import FeedbackSnackbar from "./components/FeedbackSnackbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Error404 from "./screens/Error404";
import LandingPage from "./screens/LandingPage";
import LoginPage from "./screens/LoginPage";
import AccountPage from "./screens/AccountPage";
import FavoritePage from "./screens/FavoritePage";
import CatalogPage from "./screens/CatalogPage";
import SearchPage from "./screens/SearchPage";
import RegConfirmRegistration from "./features/registration/RegConfirmRegistration";
import RegConfirmSubscription from "./features/registration/RegConfirmSubscription";
import UserForgetPassword from "./features/userChange/UserForgetPassword";
import UserConfirmRecovery from "./features/userChange/UserConfirmRecovery";
import UserFederatedInfo from "./features/userChange/UserFederatedInfo";

function App() {
  const dispatch = useDispatch();
  const authLogin = useSelector(selectAuthLogin);
  const { successCode } = authLogin;
  const {
    csrfToken,
    ip,
    payload: userInfo,
  } = useSelector(selectAuthUserInfo);
  const { role, isInfoSupplemented } = userInfo;

  useEffect(() => {
    axios.defaults.withCredentials = true;
    dispatch(authPreflight());
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (Boolean(csrfToken) === true) {
      axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csrfToken]);
  useEffect(() => {
    const countryCode = sessionStorage.getItem("countryCode");
    if ((Boolean(ip) === true) && (Boolean(countryCode) === false)) {
      dispatch(authUserLocation(ip));
    };
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ip]);
  useEffect(() => {
    if (successCode === 200) {dispatch(authUserInfo());}
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successCode]);
  return (
    <div className="App">
      <BrowserRouter>
        <PrimarySearchAppBar />
        {
          role === 2 && isInfoSupplemented === false ?
            <Switch>
              <Route component={UserFederatedInfo} />
            </Switch>
            :
            <Switch>
              <Route path="/confirmRegistration/:token" component={RegConfirmRegistration} />
              <Route path="/confirmSubscription/:token" component={RegConfirmSubscription} />
              <Route path="/recovery" component={UserForgetPassword} />
              <Route path="/confirmRecovery/:token" component={UserConfirmRecovery} />
              <Route path="/account" component={AccountPage} />
              {role === 0 && <Route path="/catalog" component={CatalogPage} />}
              <Route path="/favorite" component={FavoritePage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/login" component={LoginPage} />
              <Route exact path="/" component={LandingPage} />
              <Route component={Error404} />
            </Switch>
          }
        <CookiesSnackbar />
        <FeedbackSnackbar />
        <BottomAppBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
