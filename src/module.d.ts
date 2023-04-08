import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customLight: Palette["primary"];
    customGrey: Palette["primary"];
    accent: Palette["primary"];
  }

  interface PaletteOptions {
    customLight: PaletteOptions["primary"];
    customGrey: PaletteOptions["primary"];
    accent: PaletteOptions["primary"];
  }
}
