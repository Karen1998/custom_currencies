import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
  primary: {
    main: "#082C7F",
  },
  secondary: {
    main: "#2196f3",
  },
  text: {
    primary: "#fff",
  },
};

const typography = {
  h1: {
    color: "currentColor",
  },
  h2: {
    color: "currentColor",
  },
  h3: {
    color: "currentColor",
  },
  h4: {
    color: "currentColor",
  },
  h5: {
    color: "currentColor",
  },
  h6: {
    color: "currentColor",
  },
};

const theme = createMuiTheme({
  palette,
  overrides: {
    MuiTypography: {
      typography,
    },
    MuiButton: {
      root: {
        fontWeight: 500,
      },
      contained: {
        backgroundColor: palette.secondary.main,
        color: palette.text.primary,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "inherit",
      },
    },
  },
});

export default theme;
