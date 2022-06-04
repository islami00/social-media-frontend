const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      xs: "414px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        violet: {
          50: "#eae6ec",
          100: "#d5ced9",
          200: "#bfb5c6",
          300: "#aa9cb3",
          400: "#9584a1",
          500: "#806b8e",
          600: "#6b527b",
          700: "#553968",
          800: "#402155",
          900: "#2b0842",
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
