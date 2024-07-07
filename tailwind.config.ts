import type { Config } from "tailwindcss";
import daisyui from "daisyui"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["acid"],
          primary: "#0079FF",

        },
      },
    ]
  },
  plugins: [
    daisyui
  ],
};
export default config;
