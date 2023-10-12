import { nextui, NextUIPluginConfig, ColorScale } from "@nextui-org/react";

const colors: ColorScale = {
  "50": "hsl(115, 76%, 97%)",
  "100": "hsl(118, 84%, 93%)",
  "200": "hsl(119, 76%, 85%)",
  "300": "hsl(119, 75%, 73%)",
  "400": "hsl(120, 67%, 58%)",
  "500": "hsl(120, 69%, 43%)",
  "600": "hsl(120, 74%, 36%)",
  "700": "hsl(120, 70%, 29%)",
  "800": "hsl(121, 63%, 24%)",
  "900": "hsl(122, 59%, 20%)",
};

const config: NextUIPluginConfig = {
  prefix: "nextui",
  addCommonColors: false,
  defaultTheme: "light",
  defaultExtendTheme: "light",
  layout: {},
  themes: {
    light: {
      layout: {},
      colors: {
        primary: {
          ...colors,
          foreground: "#000000",
          DEFAULT: colors["500"],
        },
      },
    },
    dark: {
      layout: {},
      colors: {
        primary: {
          ...colors,
          foreground: "#ffffff",
          DEFAULT: colors["500"],
        },
      },
    },
  },
};

const nextuiPlugin = nextui(config);

export default nextuiPlugin;
