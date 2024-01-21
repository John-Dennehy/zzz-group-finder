import { ColorScale, NextUIPluginConfig, nextui } from "@nextui-org/react"

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
}

// $rosewater: #f4dbd6;
// $flamingo: #f0c6c6;
// $pink: #f5bde6;
// $mauve: #c6a0f6;
// $red: #ed8796;
// $maroon: #ee99a0;
// $peach: #f5a97f;
// $yellow: #eed49f;
// $green: #a6da95;
// $teal: #8bd5ca;
// $sky: #91d7e3;
// $sapphire: #7dc4e4;
// $blue: #8aadf4;
// $lavender: #b7bdf8;
// $text: #cad3f5;
// $subtext1: #b8c0e0;
// $subtext0: #a5adcb;
// $overlay2: #939ab7;
// $overlay1: #8087a2;
// $overlay0: #6e738d;
// $surface2: #5b6078;
// $surface1: #494d64;
// $surface0: #363a4f;
// $base: #24273a;
// $mantle: #1e2030;
// $crust: #181926;

const nextUiConfig: NextUIPluginConfig = {
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
}

export const nextuiPlugin = nextui(nextUiConfig)
export default nextuiPlugin
