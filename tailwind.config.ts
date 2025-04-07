import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: {
        100: 'rgb(var(--primary-100) / <alpha-value>)',
        200: 'rgb(var(--primary-200) / <alpha-value>)',
        300: 'rgb(var(--primary-300) / <alpha-value>)',
        400: 'rgb(var(--primary-400) / <alpha-value>)',
        DEFAULT: 'rgb(var(--primary-500) / <alpha-value>)',
        600: 'rgb(var(--primary-600) / <alpha-value>)',
        700: 'rgb(var(--primary-700) / <alpha-value>)',
        800: 'rgb(var(--primary-800) / <alpha-value>)',
        900: 'rgb(var(--primary-900) / <alpha-value>)',
      },
      secondary: {
        100: 'rgb(var(--secondary-100) / <alpha-value>)',
        200: 'rgb(var(--secondary-200) / <alpha-value>)',
        300: 'rgb(var(--secondary-300) / <alpha-value>)',
        400: 'rgb(var(--secondary-400) / <alpha-value>)',
        DEFAULT: 'rgb(var(--secondary-500) / <alpha-value>)',
        600: 'rgb(var(--secondary-600) / <alpha-value>)',
        700: 'rgb(var(--secondary-700) / <alpha-value>)',
        800: 'rgb(var(--secondary-800) / <alpha-value>)',
        900: 'rgb(var(--secondary-900) / <alpha-value>)',
      },
      accent: {
        white: 'rgb(var(--accent-white) / <alpha-value>)',
        black: 'rgb(var(--accent-black) / <alpha-value>)',
      },
      success: {
        DEFAULT: "#12A136",
        100: "#ECFFFB",
        800: "#CDF9D8",
      },
      danger: {
        DEFAULT: "#DF2B2B",
        100: "#FD6767",
        800: "#FFF0F0",
      },
      warning: {
        DEFAULT: "#EEAF40",
        100: "#FFEAEE",
      },
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
    },
    extend: {
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
      },
    },
  },
  plugins: [],
};
export default config;
