const colors = require('tailwindcss/colors');
module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
        trueGray: colors.trueGray,
        lightBlue: colors.sky,
        orange: colors.orange,
        amber: colors.amber,
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
      },
      screens: {
        xxs: { max: '430px' },
        xs: { min: '431px' },
      },
    },
  },
  plugins: [],
};
