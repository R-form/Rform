module.exports = {
  mode: "jit",
  purge: ["./app/views/**/*.{erb,html}", "./app/helpers/**/*.rb", "./app/javascript/**/*.js"],
  safelist: [
    "gentleYellow",
    "ironGray",
    "ironGrayHover",
    "footerBlack",
    "bgGray",
    "brightRed",
    "brightOrange",
    "brightYellow",
    "brightGreen",
    "brightBlue",
    "brightNavy",
    "brightGray",
    "softRed",
    "softOrange",
    "softYellow",
    "softGreen",
    "softBlue",
    "softNavy",
    "softGray",
    "irisBlue",
    "brightPurple",
    "softPurple",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mint: "#91B493",
        grassGreen: "#86C166",
        vermilion: "#AB3B3A",
        paleVermilion: "#D75455",
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
        irisBlue: "#00bcd4",
        brightPurple: "#6A4C9C",
        softPurple: "#B28FCE",
      },
      outline: {
        ironGrayHover: "3px solid #A5A2A0",
        brightRed: "3px solid #8E354A",
        brightOrange: "3px solid #E62",
        brightYellow: "3px solid #EA0",
        brightPurple: "3px solid #6A4C9C",
        brightGreen: "3px solid #6C6",
        brightBlue: "3px solid #19F",
        brightNavy: "3px solid #2B5F75",
        brightGray: "3px solid #7A7573",
        brightPurple: "3px solid #6A4C9C",
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
}
