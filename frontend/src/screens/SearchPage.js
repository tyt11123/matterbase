import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../components/styles/materialUIStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchAccordion from "../features/search/SearchAccordion";
import SearchMobile from "../features/search/SearchMobile";
import SearchGrid from "../components/SearchGrid";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 3),
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(10, 3),
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function SearchPage() {
  const classes = useStyles();
  const criteria = {
    "Options": [
      "Display all Color and variations",
      "Ready to ship",
    ],
    "Uses": ["Commercial", "Residential", "Interior", "Exterior"],
    "Application": [
      "Bath",
      "Countertop",
      "Facade",
      "Fireplace",
      "Flooring",
      "Kitchen",
      "Paving & Deck",
      "Pool & Fountain",
      "Stair & Elevator",
      "Wall",
    ],
    "Color": [
      "White",
      "Black",
      "Grey",
      "Green",
      "Blue",
      "Red",
      "Yellow",
      "Pink",
      "Orange",
      "Brown",
      "Purple",
      "Multi",
    ],
    "Construction": [
      "Color body",
      "Distressed",
      "Encaustic",
      "Glazed",
      "Glazed Color Body",
      "Hand-Painted",
      "Handmade",
      "Mirror",
      "Printed (digitally)",
      "Printed (Screen)",
      "Through body Color",
      "Unglazed",
      "Unglazed Through Body",
    ],
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <ThemeProvider theme={bodyFont}>
          <CssBaseline />
          <div className={classes.sectionDesktop}>
            <Container>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item xs={2}>
                  <SearchAccordion criteria={criteria} />
                </Grid>
                <Grid item xs={10}>
                  <SearchGrid />
                </Grid>
              </Grid>
            </Container>
          </div>
          <div className={classes.sectionMobile}>
            <SearchMobile criteria={criteria} />
            <SearchGrid />
          </div>
        </ThemeProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
