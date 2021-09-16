import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse';
import MaterialsIcon from '@material-ui/icons/Gavel';
import HardwareIcon from '@material-ui/icons/House';
import FurnitureIcon from '@material-ui/icons/Deck';
import ProjectsIcon from '@material-ui/icons/InsertPhoto';
import StarIcon from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [hardwareOpen, setHardwareOpen] = useState(false);
  const [furnitureOpen, setFurnitureOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleMaterialsClick = () => {
    setMaterialsOpen(!materialsOpen);
  };

  const handleHardwareClick = () => {
    setHardwareOpen(!hardwareOpen);
  };

  const handleFurnitureClick = () => {
    setFurnitureOpen(!furnitureOpen);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <List>
        <ListItem button onClick={handleMaterialsClick}>
          <ListItemIcon>
            <MaterialsIcon />
          </ListItemIcon>
          <ListItemText primary="Materials" />
          {materialsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={materialsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <div
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              {["Timber", "Stone", "Ceramic Tiles", "Leather"].map((text, index) => (
                <ListItem button className={classes.nested} key={index}>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </div>
          </List>
        </Collapse>
        <ListItem button onClick={handleHardwareClick}>
          <ListItemIcon>
            <HardwareIcon />
          </ListItemIcon>
          <ListItemText primary="Hardware" />
          {hardwareOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={hardwareOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <div
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              {["Handle", "Switches", "Lighting", "Sinks", "Faucets"].map((text, index) => (
                <ListItem button className={classes.nested} key={index}>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </div>
          </List>
        </Collapse>
        <ListItem button onClick={handleFurnitureClick}>
          <ListItemIcon>
            <FurnitureIcon />
          </ListItemIcon>
          <ListItemText primary="Furniture" />
          {furnitureOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={furnitureOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <div
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              {["Residential", "Commercial", "Educational", "Cultural"].map((text, index) => (
                <ListItem button className={classes.nested} key={index}>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </div>
          </List>
        </Collapse>
        <div
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <ListItem button>
            <ListItemIcon>
              <ProjectsIcon />
            </ListItemIcon>
            <ListItemText primary={"Projects"} />
          </ListItem>
        </div>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={props.className}
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
}
