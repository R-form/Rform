module.exports = {
  mode: "jit",
  purge: [
    "./app/views/**/*.{erb,html}",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gentleYellow: "#F3EADA",
        ironGray: "#7A7573",
        ironGrayHover: "#A5A2A0",
        footerBlack: "#1A1919",
        bgGray: "#a4b5c4",
        brightRed: "#8E354A",
        brightOrange: "#E62",
        brightYellow: "#EA0",
        brightGreen: "#6C6",
        brightBlue: "#19F",
        brightNavy: "#2B5F75",
        brightGray: "#7A7573",
        softRed: "#DC9FB4",
        softOrange: "#eca38f",
        softYellow: "#ffc97b",
        softGreen: "#bfe8c5",
        softBlue: "#bfe2e8",
        softNavy: "#6699A1",
        softGray: "#a4b5c4",
      },
      outline: {
        ironGrayHover: "3px solid #A5A2A0",
        brightRed: "3px solid #8E354A",
        brightOrange: "3px solid #E62",
        brightYellow: "3px solid #EA0",
        transparent: "3px solid #transparent",
        brightGreen: "3px solid #6C6",
        brightBlue: "3px solid #19F",
        brightNavy: "3px solid #2B5F75",
        brightGray: "3px solid #7A7573",
      },
    },
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
    },
  },
  variants: {
    extend: {
      outline: ["focus-within"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
