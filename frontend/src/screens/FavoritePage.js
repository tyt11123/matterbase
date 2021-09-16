import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../components/styles/materialUIStyles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FavoritePaper from "../components/FavoritePaper";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 3),
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(10, 3),
    },
  },
  grid: {
    marginTop: theme.spacing(1),
  },
}));

export default function FavoritePage() {
  const classes = useStyles();
  const favorites = [
    {
      id: 1,
      brand: "Urban Coast Tile",
      name: "Stanlet Glam #5",
      src: "https://img.eservice-hk.net/upload/2021/07/27/155625_77b68595d1feaf7f6d2dc910e8f5e571.JPG",
      link: "/stanlet-glam-#5-1",
    },
    {
      id: 2,
      brand: "GENROSE Stone + Tile",
      name: "Promenade",
      src: "https://img.eservice-hk.net/upload/2021/07/27/155648_c40b186c1f4afebc850c17de94b41456.JPG",
      link: "/promenade-2",
    },
    {
      id: 3,
      brand: "Mosa",
      name: "4x12",
      src: "https://img.eservice-hk.net/upload/2021/07/27/155704_1ec88b53d40ccd5e84e87691f207da67.JPG",
      link: "/4x12-3",
    },
    {
      id: 4,
      brand: "Trendy Surfaces",
      name: "Chalet",
      src: "https://img.eservice-hk.net/upload/2021/07/27/155721_35bbc116c76146e5ef8570fa198d39e5.JPG",
      link: "/chalet-4",
    },
    {
      id: 5,
      brand: "Aphelion Collection",
      name: "Nova",
      src: "https://img.eservice-hk.net/upload/2021/07/27/155735_741212f574d8f750c4e408e850f83e05.JPG",
      link: "/nova-5",
    },
    {
      id: 6,
      brand: "Atlas Concorde",
      name: "Dolmen Pro",
      src: "https://img.eservice-hk.net/upload/2021/07/27/155801_71a6846abd78bb8bc2183dd33454dcfe.JPG",
      link: "/dolmen-pro-6",
    },
    {
      id: 7,
      brand: "Riad Tile",
      name: "Zellige",
      src: "https://img.eservice-hk.net/upload/2021/07/27/155816_e1b955a358516c074c12b6dd0e93e590.JPG",
      link: "/zellige-7",
    },
  ];

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <ThemeProvider theme={bodyFont}>
          <div className={classes.root}>
            <Container maxWidth="xl">
              <Grid className={classes.grid} container spacing={2} alignItems="flex-end">
                {
                  Array.isArray(favorites) &&
                  favorites.map((item, i) => (
                    <Grid key={i} item xs={12} sm={3}>
                      <FavoritePaper favorite={item} />
                    </Grid>
                  ))
                }
              </Grid>
            </Container>
          </div>
        </ThemeProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}