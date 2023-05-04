// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customLight: Palette["primary"];
    customGrey: Palette["primary"];
    customBgColor: Palette["primary"];
    accent: Palette["primary"];
  }

  interface PaletteOptions {
    customLight: PaletteOptions["primary"];
    customGrey: PaletteOptions["primary"];
    customBgColor: PaletteOptions["primary"];
    accent: PaletteOptions["primary"];
  }
}
