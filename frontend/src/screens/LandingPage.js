import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { bodyFont } from "../components/styles/materialUIStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Flickity from "react-flickity-component";
import "../components/styles/flickity_landing_page.css";
import LandingPageBanner from "../components/LandingPageBanner";
import LandingPageMaterial from "../components/LandingPageMaterial";
import LandingPagePalette from "../components/LandingPagePalette";
import LandingPageBrand from "../components/LandingPageBrand";
import LandingPageProject from "../components/LandingPageProject";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 3),
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(10, 3),
    },
  },
  advertisement: {
    width: "100%",
    height: theme.spacing(40),
    objectFit: "cover",
  },
  materials: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const flickityOptions = {
  contain: true,
  prevNextButtons: false,
  pageDots: true,
};

export default function LandingPage() {
  const classes = useStyles();
  const history = useHistory();
  const ads = [
    { id: 1, src: "https://placeimg.com/800/300/arch", alt: "q", link: "/" },
    { id: 2, src: "https://placeimg.com/800/300/nature", alt: "w", link: "/" },
    { id: 3, src: "https://placeimg.com/800/300/tech", alt: "e", link: "/" },
    { id: 4, src: "https://picsum.photos/id/975/800/300/", alt: "r", link: "/" },
    { id: 5, src: "https://picsum.photos/id/998/800/300/", alt: "t", link: "/" },
  ];
  const material = [
    {
      id: 1,
      src:
        "https://img.eservice-hk.net/upload/2021/04/27/105722_d214f6dba4123f09f867716cda88528a.jpg",
      alt: "q",
      link: "/material",
      title: "Haven",
      content: "Atlas Concorde",
    },
    {
      id: 2,
      src:
        "https://img.eservice-hk.net/upload/2021/04/27/105655_57488e1c7d861824cdd8b17c1c8da9c9.jpg",
      alt: "w",
      link: "/material",
      title: "Lorem Ipsum",
      content: "Lorem Ipsum",
    },
    {
      id: 3,
      src:
        "https://img.eservice-hk.net/upload/2021/04/27/105703_cfa388ffddb4c88b0b74ec27609650c4.jpg",
      alt: "e",
      link: "/material",
      title: "Haven",
      content: "Lorem Ipsum",
    },
    {
      id: 4,
      src:
        "https://img.eservice-hk.net/upload/2021/04/27/105714_2330724793f09b074e61b93477dd25f7.jpg",
      alt: "r",
      link: "/material",
      title: "Lorem Ipsum",
      content: "Atlas Concorde",
    },
  ];
  const palettes = [
    {
      id: 1,
      src:
        "https://img.eservice-hk.net/upload/2021/04/27/105745_749a4d8ecc49631031d7cf2b52e18201.JPG",
      alt: "q",
      link: "/",
      title: "Lorem Ipsum",
    },
    {
      id: 2,
      src:
        "https://img.eservice-hk.net/upload/2021/04/27/105751_20a2b0937846c9f64b28b9b74d40232c.JPG",
      alt: "w",
      link: "/",
      title: "Lorem Ipsum",
    },
    {
      id: 3,
      src:
        "https://img.eservice-hk.net/upload/2021/04/27/105757_bb961fadafdf33eb186a223f462ae43d.JPG",
      alt: "e",
      link: "/",
      title: "Lorem Ipsum",
    },
    {
      id: 4,
      src:
        "https://img.eservice-hk.net/upload/2021/04/27/105803_a9d4864b51faf83e100ca8b26d48a824.JPG",
      alt: "r",
      link: "/",
      title: "Lorem Ipsum",
    },
    {
      id: 5,
      src:
        "https://img.eservice-hk.net/upload/2021/04/27/105807_3b245f70a68c1f77eca92c4fbf138dab.JPG",
      alt: "t",
      link: "/",
      title: "Lorem Ipsum",
    },
    {
      id: 6,
      src:
        "https://img.eservice-hk.net/upload/2021/04/27/105813_dca7bda6be1f84c446ff6478e497d965.JPG",
      alt: "y",
      link: "/",
      title: "Lorem Ipsum",
    },
    {
      id: 7,
      src:
        "https://img.eservice-hk.net/upload/2021/04/27/105818_e2182ed29e9289a416204e15e4fcfd5b.JPG",
      alt: "u",
      link: "/",
      title: "Match Master",
    },
    {
      id: 8,
      src:
        "https://img.eservice-hk.net/upload/2021/04/27/105823_1e8e35518967dc6573614408e2da78a4.JPG",
      alt: "i",
      link: "/",
      title: "Lorem Ipsum",
    },
  ];
  const brands = [
    {
      id: 1,
      title: "Hygge & West",
      subtitle: "Wallpaper Patterns",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      src: "https://img.eservice-hk.net/upload/2021/04/27/105643_4ac6767c58ff73dab4201df388b61b6b.jpg",
      alt: "q",
      link: "/",
    },
    {
      id: 2,
      title: "mafi America Inc",
      subtitle: "Sustainable Wood",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      src: "https://img.eservice-hk.net/upload/2021/04/27/105634_5041361750eed64bc72fa2bad99295a0.jpg",
      alt: "w",
      link: "/",
    },
    {
      id: 3,
      title: "Vitro Architectual Glass",
      subtitle: "Starphire Glass",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      src: "https://img.eservice-hk.net/upload/2021/04/27/105638_b5fef2fe0e8683aa2ad5f30cc24c8145.jpg",
      alt: "e",
      link: "/",
    },
  ];
  const projects = [
    {
      id: 1,
      title: "Concrete House / Raw Architecture Workshop",
      content: "London, United Kingdom, 2020",
      src: "https://img.eservice-hk.net/upload/2021/04/27/105829_da77ab113ac5e86cb53786ba089860ad.JPG",
      alt: "q",
      link: "/",
    },
    {
      id: 2,
      title: "WIN4 Sports Centre / EM2N",
      content: "Basel, Switzerland, 2018",
      src: "https://img.eservice-hk.net/upload/2021/04/27/105835_8e834af8b3b90edbf26b3700716344da.JPG",
      alt: "w",
      link: "/",
    },
    {
      id: 3,
      title: "UBS Headquarters Refurbishment / EM2N",
      content: "Whitefish, United States, 2016",
      src: "https://img.eservice-hk.net/upload/2021/04/27/105839_7dc6de745ca42af7a4a543d5b8c2b5ff.JPG",
      alt: "e",
      link: "/",
    },
    {
      id: 4,
      title: "Basel's New Museum of Natural History and State Archives / EM2N",
      content: "Basel, Switzerland, 2021",
      src: "https://img.eservice-hk.net/upload/2021/04/27/105845_ae6c86d2a1dcf8d7f14d91fb3745a1f5.JPG",
      alt: "r",
      link: "/",
    },
  ];

  const imageClick = (link) => history.push(link);

  return (
    <React.Fragment>
      <ThemeProvider theme={bodyFont}>
        <ThemeProvider theme={bodyFont}>
          <CssBaseline />
          <Flickity options={flickityOptions} static>
            {ads &&
              ads[0] &&
              ads.map((ad, i) => (
                <img
                  key={i}
                  className={classes.advertisement}
                  src={ad.src}
                  alt={ad.alt}
                  onDoubleClick={() => imageClick(ad.link)}
                />
              ))}
          </Flickity>
          <LandingPageBanner />
          <LandingPageMaterial material={material} />
          <LandingPagePalette palettes={palettes} />
          <LandingPageBrand brands={brands} />
          <LandingPageProject projects={projects} />
        </ThemeProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
