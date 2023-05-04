import React from "react";
import ReactDOM from "react-dom/client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { router } from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0041F0",
    },
    error: {
      main: "#E5172B",
    },
    warning: {
      main: "#F67B09",
    },
    success: {
      main: "#209B54",
    },
    customLight: {
      main: "#E8EDFA",
      light: "#F8F5FF",
      dark: "#E2F1FF",
    },
    customGrey: {
      main: "#888888",
      light: "#D0D0D0",
      dark: "#292929",
    },
    accent: {
      main: "#A055F5",
    },
    contrastThreshold: 4.5,
  },
  typography: {
    fontFamily: "Inter,Roboto,Helvetica,Arial,sans-serif",
    allVariants: {
      color: "#212121",
      lineHeight: 1.1,
    },
    h1: {
      fontSize: "80px",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "64px",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "40px",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "32px",
      fontWeight: "600",
    },
    h5: {
      fontSize: "24px",
      fontWeight: "600",
    },
    h6: {
      fontSize: "20px",
      fontWeight: "500",
    },
    body1: {
      fontSize: "16px",
      fontWeight: "normal",
    },
    body2: {
      fontSize: "16px",
      fontWeight: "600",
    },
    caption: {
      fontSize: "14px",
      fontWeight: "normal",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "40px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" && {
            color: "white",
            padding: "16px 20px",
          }),
          borderRadius: "40px",
          textTransform: "none",
        }),
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
