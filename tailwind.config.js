module.exports = {
  purge: [
    "./app/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  // 本次新增tailwind套件，啟動前須先yarn add @tailwindcss/forms
  plugins: [require('@tailwindcss/forms')],
};
