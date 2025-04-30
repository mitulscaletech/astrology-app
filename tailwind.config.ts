import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    fontFamily: {
      head: "var(--playfair_display)"
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1440px",
      "3xl": "1620px",
      "4xl": "1800px"
    },
    container: {
      center: true,
      padding: "12px"
    },
    colors: {
      primary: {
        100: "rgb(var(--primary-100) / <alpha-value>)",
        200: "rgb(var(--primary-200) / <alpha-value>)",
        300: "rgb(var(--primary-300) / <alpha-value>)",
        400: "rgb(var(--primary-400) / <alpha-value>)",
        DEFAULT: "rgb(var(--primary-500) / <alpha-value>)",
        600: "rgb(var(--primary-600) / <alpha-value>)",
        700: "rgb(var(--primary-700) / <alpha-value>)",
        800: "rgb(var(--primary-800) / <alpha-value>)",
        900: "rgb(var(--primary-900) / <alpha-value>)"
      },
      secondary: {
        100: "rgb(var(--secondary-100) / <alpha-value>)",
        200: "rgb(var(--secondary-200) / <alpha-value>)",
        300: "rgb(var(--secondary-300) / <alpha-value>)",
        400: "rgb(var(--secondary-400) / <alpha-value>)",
        DEFAULT: "rgb(var(--secondary-500) / <alpha-value>)",
        600: "rgb(var(--secondary-600) / <alpha-value>)",
        700: "rgb(var(--secondary-700) / <alpha-value>)",
        800: "rgb(var(--secondary-800) / <alpha-value>)",
        900: "rgb(var(--secondary-900) / <alpha-value>)"
      },
      highlight: {
        100: "#FDEAD3",
        DEFAULT: "rgb(var(--highlight-500) / <alpha-value>)"
      },
      muted: {
        DEFAULT: "rgb(var(--muted-500) / <alpha-value>)"
      },
      info: {
        DEFAULT: "rgb(var(--info-500) / <alpha-value>)"
      },
      accent: {
        white: "rgb(var(--accent-white) / <alpha-value>)",
        black: "rgb(var(--accent-black) / <alpha-value>)"
      },
      success: {
        DEFAULT: "#12A136",
        100: "#ECFFFB",
        800: "#CDF9D8"
      },
      danger: {
        DEFAULT: "#DF2B2B",
        100: "#FD6767",
        800: "#FFF0F0"
      },
      warning: {
        DEFAULT: "#EEAF40",
        100: "#EEAF40",
        800: "#FFEAEE"
      },
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit"
    },
    extend: {
      fontSize: {
        xSmall: "13px",
        small: "15px",
        md: "17px",
        large: "19px",
        "1.5xl": "22px",
        "2.5xl": "28px",
        "7.5xl": "84px",
        "3.5xl": "32px"
      },
      spacing: {
        13: "3.25rem", // 52px
        15: "3.75rem", // 60px
        18: "4.5rem", // 72px
        88: "22rem", // 352px
        112: "28rem", // 448px
        128: "32rem", // 512px
        144: "36rem" // 576px
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6"
      },
      boxShadow: {
        box: "0px 22px 44px 0px rgba(var(--secondary-200), 0.24)",
        "box-sm": "0px 8px 16px 0px rgba(var(--secondary-200), 0.14)",
        card: "-2px -2px 4px 0px rgba(28, 31, 58, 0.05), 2px 2px 12px 0px rgba(28, 31, 58, 0.1)",
        "card-sm": "0px 0px 12px 0px rgba(29 29 60 / 0.14)"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" }
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" }
        },
        "slide-out-to-top": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" }
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" }
        },
        "slide-out-to-bottom": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" }
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "slide-out-to-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" }
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "slide-out-to-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-in",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-out-to-top": "slide-out-to-top 0.3s ease-in",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-out-to-bottom": "slide-out-to-bottom 0.3s ease-in",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-out-to-left": "slide-out-to-left 0.3s ease-in",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
        "slide-out-to-right": "slide-out-to-right 0.3s ease-in"
      }
    }
  },
  plugins: [
    function customContainer({ addComponents }: { addComponents: (components: Record<string, any>) => void }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "540px"
          },
          "@screen md": {
            maxWidth: "720px"
          },
          "@screen lg": {
            maxWidth: "960px"
          },
          "@screen xl": {
            maxWidth: "1170px"
          },
          "@screen 2xl": {
            maxWidth: "1320px"
          },
          "@screen 3xl": {
            maxWidth: "1580px"
          },
          "@screen 4xl": {
            maxWidth: "1752px"
          }
        }
      });
    }
  ]
};
export default config;
