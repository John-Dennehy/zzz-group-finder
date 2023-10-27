import { nextui, NextUIPluginConfig, ColorScale } from "@nextui-org/react";

const colors: ColorScale = {
  "50": "hsl(138, 76%, 97%)",
  "100": "hsl(141, 84%, 93%)",
  "200": "hsl(141, 79%, 85%)",
  "300": "hsl(142, 77%, 73%)",
  "400": "hsl(142, 69%, 58%)",
  "500": "hsl(142, 71%, 45%)",
  "600": "hsl(142, 76%, 36%)",
  "700": "hsl(142, 72%, 29%)",
  "800": "hsl(143, 64%, 24%)",
  "900": "hsl(144, 61%, 20%)",
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
