import { createTheme } from "@mui/material/styles";
import { FontFamily } from "../../styles/fonts";

declare module "@mui/material/styles/createTypography" {
  interface FontStyle {
    accent: string;
  }
}

declare module "@mui/material/styles" {
  interface GradientColors {
    start: string;
    end: string;
  }

  interface PaletteColor {
    0: string;
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  }

  interface SimplePaletteColorOptions {
    0?: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    950?: string;
  }

  interface AdditionalColor {
    main: string;
    100?: string;
    500?: string;
    200: string;
  }

  interface Palette {
    grayscale: {
      0: string;
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    additional: {
      green: AdditionalColor;
      red: AdditionalColor;
      orange: AdditionalColor;
      pink: AdditionalColor;
      blue: AdditionalColor;
      yellow: AdditionalColor;
    };
    gradient: {
      gold: GradientColors;
      bronze: GradientColors;
      silver: GradientColors;
      diamond: GradientColors;
      blue: GradientColors;
      red: GradientColors;
      orange: GradientColors;
      second: GradientColors;
    };
  }

  interface PaletteOptions {
    grayscale?: Palette["grayscale"];
    additional?: Palette["additional"];
    gradient?: Palette["gradient"];
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1441,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      "0": "#FFFFFF",
      main: "#0091FF",
      "50": "#E5F4FF",
      "100": "#CCE9FF",
      "200": "#99D3FF",
      "300": "#66BDFF",
      "400": "#33A7FF",
      "600": "#0074CC",
      "700": "#005799",
      "800": "#003A66",
      "900": "#001D33",
      "950": "#000E1A",
    },
    grayscale: {
      0: "#FFFFFF",
      50: "#F2F2F2",
      100: "#E6E6E6",
      200: "#CCCCCC",
      300: "#B3B3B3",
      400: "#999999",
      500: "#838383",
      600: "#666666",
      700: "#4D4D4D",
      800: "#333333",
      900: "#1A1A1A",
      950: "#000000",
    },
    additional: {
      green: { main: "#11A772", 200: "#E7F6F0", 100: "#E8F5F1" },
      red: { main: "#E5484D", 500: "#ED4A45", 200: "#FDF4F4" },
      orange: { main: "#FF801F", 200: "#FFF2E9" },
      pink: { main: "#E5467B", 200: "#FCECF0" },
      blue: { main: "#0FB3FA", 200: "#D8E3F3" },
      yellow: { main: "#FFC53D", 200: "#FDEACE" },
    },
    gradient: {
      gold: { start: "#FECE85", end: "#FEA713" },
      bronze: { start: "#D2AC84", end: "#B49C83" },
      silver: { start: "#ABABAB", end: "#888E9A" },
      diamond: { start: "#99D3FF", end: "#0091FF" },
      blue: { start: "#70B8FF", end: "#0090FF" },
      red: { start: "#EC5D5E", end: "#E5484D" },
      orange: { start: "#FFA057", end: "#FF801F" },
      second: { start: "#D3E1FF", end: "#888E9A" },
    },
  },
  typography: {
    fontFamily: FontFamily.primary,
    accent: FontFamily.accent,
  },
});
