const colors = require("tailwindcss/colors");

module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      },
    },
  },
};
