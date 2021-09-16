import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, } from "react-redux";
import { authLogout, selectAuthUserInfo } from "../features/authentication/authAsyncThunk";
import RegDesktop from "../features/registration/RegDesktop";
import AuthDesktop from "../features/authentication/AuthDesktop";
import RegMobile from "../features/registration/RegMobile";
import AuthMobile from "../features/authentication/AuthMobile";
import SearchPopover from "./SearchPopover";
import { makeStyles, ThemeProvider, } from "@material-ui/core/styles";
import {
  header_background_colour,
  header_title_colour,
  titleFont,
} from "./styles/materialUIStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MatterBaseLogo from "./img/MatterBaseLogo";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import LanguageIcon from "@material-ui/icons/Language";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";
import Box from "@material-ui/core/Box";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fade from "@material-ui/core/Fade";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import CountryFlag from "react-country-flag";
import MaterialsDialog from "./MaterialsDialog";
import HardwareDialog from "./HardwareDialog";
import FurnitureDialog from "./FurnitureDialog";
import { HighlightButton, TextButton } from "./CustomButtons";

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Fade appear={false} direction="down" in={!trigger}>
      {children}
    </Fade>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: header_background_colour,
    position: "static",
    [theme.breakpoints.up("md")]: {
      position: "fixed",
    },
  },
  fixedAppBarFiller: {
    height: theme.spacing(17),
  },
  grow: {
    flexGrow: 1,
  },
  middleGrow: {
    flexGrow: 0.9,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
    color: header_title_colour,
  },
  matterBaseLogo: {
    width: theme.spacing(4),
    verticalAlign: "text-bottom",
  },
  desktopLink: {
    color: "inherit",
    margin: theme.spacing(0, 2),
  },
  countryFlag: {
    margin: theme.spacing(0, 2, 0, 0.5),
    fontSize: theme.spacing(3),
    lineHeight: theme.spacing(3),
    alignSelf: "center",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  bannerDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      minHeight: "36px",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const authUserInfo = useSelector(selectAuthUserInfo);
  const { payload: userInfo, countryCode } = authUserInfo;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [hardwareOpen, setHardwareOpen] = useState(false);
  const [furnitureOpen, setFurnitureOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      {
        Object.keys(userInfo).length > 0 ?
          <div>
            <MenuItem>
              <p>Welcome{userInfo.firstName ? `, ${userInfo.firstName}` : "!"}</p>
            </MenuItem>
            <Link href="/account" color="inherit">
              <MenuItem>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <p>Profile</p>
              </MenuItem>
            </Link>
          </div> :
        <div onClick={handleMenuClose}>
          <RegMobile />
        </div>
      }
      {
        Object.keys(userInfo).length < 1 &&
        <div onClick={handleMenuClose}>
          <AuthMobile />
        </div>
      }
      {
        Object.keys(userInfo).length > 0 &&
        <MenuItem onClick={() => dispatch(authLogout())}>
          <IconButton
            aria-label="logout"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      }
    </Menu>
  );

  return (
    <ThemeProvider theme={titleFont}>
      <ThemeProvider theme={titleFont}>
        <div className={classes.grow} id="back-to-top-anchor">
          <div className={classes.sectionDesktop}>
            <Container maxWidth="sm">
              <Typography
                component="div"
                className={classes.fixedAppBarFiller}
              />
            </Container>
            <AppBar elevation={0} className={classes.appBar}>
              <Toolbar>
                <div className={classes.sectionMobile}>
                  <SwipeableTemporaryDrawer className={classes.menuButton} />
                </div>
                <SearchPopover />
                <div className={classes.middleGrow} />
                <TextButton
                  size="large"
                  href="/"
                  onClick={(e) => e.preventDefault}
                  className={classes.title}
                >
                  <Box component="span" mr={1}>
                    <MatterBaseLogo className={classes.matterBaseLogo}/>
                  </Box>
                  Matterbase
                </TextButton>
                <div className={classes.grow} />
                <LanguageIcon />
                <CountryFlag
                  countryCode={countryCode}
                  svg
                  className={classes.countryFlag}
                />
                <div className={classes.sectionDesktop}>
                  {/* <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton> */}
                  {
                    Object.keys(userInfo).length < 1 &&
                    <AuthDesktop />
                  }
                  {
                    Object.keys(userInfo).length > 0 &&
                    <Tooltip title="Favorite" aria-label="Favorite">
                      <Link href="/favorite" color="inherit">
                        <IconButton color="inherit" className={classes.menuButton}>
                          <FavoriteBorderIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  }
                  {
                    Object.keys(userInfo).length > 0 ?
                      <Tooltip title="Account Management and Order History" aria-label="account">
                        <Typography className={classes.menuButton}>
                          <Link href="/account" color="inherit">
                            Welcome{userInfo.firstName ? `, ${userInfo.firstName}` : "!"}
                          </Link>
                        </Typography>
                      </Tooltip> :
                    <RegDesktop />
                  }
                  {
                    Object.keys(userInfo).length > 0 &&
                    <HighlightButton
                     onClick={() => dispatch(authLogout())}>
                      Logout
                    </HighlightButton>
                  }
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
              <Toolbar className={classes.bannerDesktop}>
                <TextButton
                  size="small"
                  className={classes.desktopLink}
                  onClick={() => setMaterialsOpen(true)}
                >
                  Materials
                </TextButton>
                <MaterialsDialog
                  onClose={() => setMaterialsOpen(false)}
                  open={materialsOpen}
                />
                <TextButton
                  size="small"
                  className={classes.desktopLink}
                  onClick={() => setHardwareOpen(true)}
                >
                  Hardware
                </TextButton>
                <HardwareDialog
                  onClose={() => setHardwareOpen(false)}
                  open={hardwareOpen}
                />
                <TextButton
                  size="small"
                  className={classes.desktopLink}
                  onClick={() => setFurnitureOpen(true)}
                >
                  Furniture
                </TextButton>
                <FurnitureDialog
                  onClose={() => setFurnitureOpen(false)}
                  open={furnitureOpen}
                />
                <TextButton size="small" className={classes.desktopLink}>
                  Projects
                </TextButton>
              </Toolbar>
            </AppBar>
          </div>
          <HideOnScroll>
            <AppBar elevation={0} className={classes.appBar}>
              <Toolbar>
                <div className={classes.sectionMobile}>
                  <SwipeableTemporaryDrawer className={classes.menuButton} />
                </div>
                <SearchPopover />
                <div className={classes.middleGrow} />
                <TextButton
                  size="large"
                  href="/"
                  onClick={(e) => e.preventDefault}
                  className={classes.title}
                >
                  <Box component="span" mr={1}>
                    <MatterBaseLogo className={classes.matterBaseLogo}/>
                  </Box>
                  Matterbase
                </TextButton>
                <div className={classes.grow} />
                <LanguageIcon />
                <CountryFlag
                  countryCode={countryCode}
                  svg
                  className={classes.countryFlag}
                />
                <div className={classes.sectionDesktop}>
                  {/* <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton> */}
                  {
                    Object.keys(userInfo).length < 1 &&
                    <AuthDesktop />
                  }
                  {
                    Object.keys(userInfo).length > 0 &&
                    <Tooltip title="Favorite" aria-label="Favorite">
                      <Link href="/favorite" color="inherit">
                        <IconButton color="inherit" className={classes.menuButton}>
                          <FavoriteBorderIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  }
                  {
                    Object.keys(userInfo).length > 0 ?
                      <Tooltip title="Account Management and Order History" aria-label="account">
                        <Typography className={classes.menuButton}>
                          <Link href="/account" color="inherit">
                            Welcome{userInfo.firstName ? `, ${userInfo.firstName}` : "!"}
                          </Link>
                        </Typography>
                      </Tooltip> :
                    <RegDesktop />
                  }
                  {
                    Object.keys(userInfo).length > 0 &&
                    <HighlightButton
                     onClick={() => dispatch(authLogout())}>
                      Logout
                    </HighlightButton>
                  }
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
              <Toolbar className={classes.bannerDesktop}>
                <TextButton
                  size="small"
                  className={classes.desktopLink}
                  onClick={() => setMaterialsOpen(true)}
                >
                  Materials
                </TextButton>
                <TextButton
                  size="small"
                  className={classes.desktopLink}
                  onClick={() => setHardwareOpen(true)}
                >
                  Hardware
                </TextButton>
                <TextButton
                  size="small"
                  className={classes.desktopLink}
                  onClick={() => setFurnitureOpen(true)}
                >
                  Furniture
                </TextButton>
                <TextButton size="small" className={classes.desktopLink}>
                  Projects
                </TextButton>
              </Toolbar>
              <Toolbar className={classes.bannerDesktop}>
                <Typography variant="body2" component="h2">
                  The one-stop material and products platform dedicated for design professionals
                </Typography>
              </Toolbar>
            </AppBar>
          </HideOnScroll>
          {renderMobileMenu}
          {renderMenu}
        </div>
      </ThemeProvider>
    </ThemeProvider>
  );
}
