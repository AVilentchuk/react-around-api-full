// postcss.config.js

// connect plugins to the file
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcssNested = require("postcss-nested");

module.exports = {
  // connect plugins to PostCSS
  plugins: [
    // connect autoprefixer
    autoprefixer,
    // pass an object with options upon connecting cssnano:
    cssnano({ preset: "default" }), // set default minification settings
    postcssNested,
  ],
};
