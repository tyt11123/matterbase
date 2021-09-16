import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectAuthUserInfo } from '../features/authentication/authAsyncThunk';
import AdminManageGrid from '../components/AdminManageGrid';
import UserUpdate from '../features/userChange/UserUpdate';
import UserEditAdmin from '../features/userChange/UserEditAdmin';
import UserFederatedUpdate from '../features/userChange/UserFederatedUpdate';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    textAlign: "left",
    justifyContent: "left",
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      marginTop: theme.spacing(2),
    },
  },
  tabs: {
    [theme.breakpoints.up('lg')]: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    "& *": {
      textTransform: 'none',
    },
  },
  tabPanel: {
    width: "100%",
  },
}));

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={classes.tabPanel}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


export default function VerticalTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const vertical = useMediaQuery(theme.breakpoints.up('lg'));
  const [value, setValue] = useState(0);
  const authUserInfoStore = useSelector(selectAuthUserInfo);
  const { payload: userInfo, isLoggedOut } = authUserInfoStore;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isLoggedOut) {
      return history.push("/");
    };
    if (Boolean(userInfo.id) === false) {
      return history.push("/login?from=account");
    };
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, isLoggedOut]);

  return (
    <Container className={classes.root}>
      <Tabs
        orientation={vertical ? "vertical" : "horizontal"}
        variant="scrollable"
        indicatorColor="secondary"
        value={value}
        onChange={handleChange}
        aria-label="Member Information"
        className={classes.tabs}
      >
        <Tab label="Account Details" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        {
          userInfo.role === 0 &&
          <Tab label="Admin Functions" {...a11yProps(2)} />
        }
        {
          userInfo.isSuper &&
          <Tab label="Admin Account Management" {...a11yProps(3)} />
        }
      </Tabs>
      <TabPanel value={value} index={0}>
        {
          userInfo.role === 0 ?
            <UserEditAdmin /> :
            userInfo.role === 1 ?
              <UserUpdate /> :
              <UserFederatedUpdate />
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      {
        userInfo.role === 0 &&
        <TabPanel value={value} index={2}>
          <Link color="inherit" href="/catalog">Product Management</Link>
        </TabPanel>
      }
      {
        userInfo.isSuper &&
        <TabPanel value={value} index={3}>
          <AdminManageGrid />
        </TabPanel>
      }
    </Container>
  );
}
