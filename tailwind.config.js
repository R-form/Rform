module.exports = {
  mode: 'jit',
  purge: [
    "./app/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
  ],
  safelist:[
    "gentleYellow",
    "ironGray",
    "ironGrayHover",
    "footerBlack",
    "bgGray",
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
      },
      outline: {
        ironGray: "3px solid #66BB6A",
      },
    },
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
    },
  },
  variants: {
    extend: {
      outline: ['focus-within'],
    },
  },
  // 本次新增tailwind套件，啟動前須先yarn add @tailwindcss/forms
  plugins: [
    require("@tailwindcss/aspect-ratio"),
  ]

};
