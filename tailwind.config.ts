import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#1e40af",
      primaryHover: "#1d4ed8",
      secondary: "#f4f4fe",
      white: "#fdfdff",
      black: "#000000",
      backgroundTo: "#040a1f",
      error: "#ff0000",
      gray: "#E5E4E2",
      zinc: {
        900: "#44403c",
      },
      green: {
        600: "#38a169",
      },

      // ...
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-10%)", opacity: "0.3" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
      },
      animation: {
        slideIn: "slideIn 500ms ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
