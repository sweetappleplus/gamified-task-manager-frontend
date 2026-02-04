import { createTheme } from "@mui/material/styles";
import { FontFamily } from "../../styles/fonts";

declare module "@mui/material/styles" {
  interface GradientColors {
    start: string;
    end: string;
  }

  interface Palette {
    grayscale: {
      0: string;
      50: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      950: string;
    };
    additional: {
      red: string;
      redLight: string;
      green: string;
      greenMiddle: string;
      greenLight: string;
      blue: string;
      blueLight: string;
      yellow: string;
      yellowLight: string;
      pink: string;
      pinkLight: string;
      orange: string;
      orangeLight: string;
    };
    gradient: {
      yellow: GradientColors;
      gray: GradientColors;
      brown: GradientColors;
      blue: GradientColors;
      red: GradientColors;
      orange: GradientColors;
    };
    social: {
      telegram: string;
      whatsapp: string;
    };
  }

  interface PaletteOptions {
    grayscale?: Palette["grayscale"];
    additional?: Palette["additional"];
    gradient?: Palette["gradient"];
    social?: Palette["social"];
  }
}

export const theme = createTheme({
  palette: {
    grayscale: {
      0: "#FFFFFF",
      50: "#F2F2F2",
      200: "#CCCCCC",
      300: "#B3B3B3",
      400: "#999999",
      500: "#838383",
      600: "#666666",
      700: "#4D4D4D",
      950: "#000000",
    },
    additional: {
      red: "#E5484D",
      redLight: "#FDF4F4",
      green: "#11A772",
      greenMiddle: "#E8F5F1",
      greenLight: "#E7F6F0",
      blue: "#0FB3FA",
      blueLight: "#D8E3F3",
      yellow: "#FFC53D",
      yellowLight: "#FDEACE",
      pink: "#E5467B",
      pinkLight: "#FCECF0",
      orange: "#FF801F",
      orangeLight: "#FFF2E9",
    },
    gradient: {
      yellow: { start: "#FECE85", end: "#FEA713" },
      gray: { start: "#D3E1FF", end: "#888E9A" },
      brown: { start: "#FFE0BF", end: "#B49C83" },
      blue: { start: "#70B8FF", end: "#0090FF" },
      red: { start: "#EC5D5E", end: "#E5484D" },
      orange: { start: "#FFA057", end: "#FF801F" },
    },
    social: {
      telegram: "#0088CC",
      whatsapp: "#25D366",
    },
  },
  typography: {
    fontFamily: FontFamily.primary,
  },
});
