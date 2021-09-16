import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CompanyTypeGrid from '../features/catalog/CompanyTypeGrid';
import SupplierManageGrid from '../features/supplier/SupplierManageGrid';
import BrandManageGrid from '../features/brand/BrandManageGrid';
import CategoryManageGrid from '../features/category/CategoryManageGrid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
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

export default function CatalogPage() {
  const classes = useStyles();
  const theme = useTheme();
  const vertical = useMediaQuery(theme.breakpoints.up('lg'));
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className={classes.root}>
      <Tabs
        orientation={vertical ? "vertical" : "horizontal"}
        variant="scrollable"
        indicatorColor="secondary"
        value={value}
        onChange={handleChange}
        aria-label="Catalog"
        className={classes.tabs}
      >
        <Tab label="Supplier" {...a11yProps(0)} />
        <Tab label="Company Type" {...a11yProps(1)} />
        <Tab label="Brand" {...a11yProps(2)} />
        <Tab label="Item Category" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SupplierManageGrid />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CompanyTypeGrid />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BrandManageGrid />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CategoryManageGrid />
      </TabPanel>
    </Container>
  );
}
