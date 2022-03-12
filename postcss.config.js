const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    require("tailwindcss/nesting"),
    tailwindcss("./tailwind.js"),
    require("autoprefixer"),
  ],
};
