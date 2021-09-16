import { createTheme } from "@material-ui/core/styles";

export const header_background_colour = "#383838";
export const header_title_colour = "#D1BB93";
export const highlight_colour = "#D1493B";
export const footer_link_colour = "#CCCCCC";
export const footer_secondary_colour = "#AAAAAA";
export const modal_background_colour = "#FFF";
export const titleFont = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
});
export const bodyFont = createTheme({
  typography: {
    fontFamily: ["Arimo", "sans-serif"].join(","),
  },
  palette: {
    text: {
      primary: "rgba(0, 0, 0, 1)",
      secondary: "rgba(0, 0, 0, 0.87)",
      disabled: "rgba(0, 0, 0, 0.54)",
      hint: "rgba(0, 0, 0, 0.54)",
    },
  },
});
export const key_colour = {
  50: '#ece4d3',
  100: '#d1bb93',
  200: '#b28f4b',
  300: '#946700',
  400: '#834e00',
  500: '#733400',
  600: '#732b00',
  700: '#701d00',
  800: '#6a0600',
  900: '#630000'
};