/* eslint-disable */
const path = require('path');
const fs = require('fs');
const cracoBabelLoader = require('craco-babel-loader');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePackage = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [
          resolvePackage('../packages/ui'),
          resolvePackage('../packages/utils'),
          resolvePackage('../packages/types'),
        ],
      },
    },
  ],
  babel: {
    presets: ['@emotion/babel-preset-css-prop'],
  },
};
