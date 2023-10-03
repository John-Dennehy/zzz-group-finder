import { nextui, NextUIPluginConfig } from "@nextui-org/react";

const config: NextUIPluginConfig = {
  // prefix: "nextui",
  addCommonColors: false,
  defaultTheme: "light",
  // defaultExtendTheme: "light",
  // layout: {},
  // themes: {
  //   light: {
  //     layout: {},
  //     colors: {}, // light theme colors
  //   },
  //   dark: {
  //     layout: {},
  //     colors: {},
  //   },
  // },
};

const nextuiPlugin = nextui();

export default nextuiPlugin;
