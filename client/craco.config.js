/* eslint-disable */
const cracoBabelLoader = require('craco-babel-loader');

module.exports = {
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [],
      },
    },
  ],
  babel: {
    presets: ['@emotion/babel-preset-css-prop'],
  },
};
