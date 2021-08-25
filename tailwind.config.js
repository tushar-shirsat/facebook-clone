module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ["active"],
      borderColor: ["active"],
      textColor: ["group-hover"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
