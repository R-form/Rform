module.exports = {
  purge: [
    "./app/**/*.html.erb",
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
      },
      outline: {
        ironGrayHover: "2px solid #A5A2A0",
      },
    },
  },
  variants: {
    extend: {},
  },
  // 本次新增tailwind套件，啟動前須先yarn add @tailwindcss/forms
  plugins: [require("@tailwindcss/forms")],
};
