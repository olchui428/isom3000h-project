import { createTheme } from "@mui/material/styles";

/**
 * Custom Material UI light theme. See https://mui.com/material-ui/customization/theming/.
 */
export const muiLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#6573c3",
      main: "#3f51b5",
      dark: "#2c387e",
    },
    secondary: {
      light: "#ffa733",
      main: "#ff9100",
      dark: "#b26500",
    },
  },
});

/**
 * Custom Material UI dark theme. See https://mui.com/material-ui/customization/theming/.
 */
export const muiDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9fa8da",
    },
  },
});
