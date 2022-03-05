module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
    fontSize: {
      header: ["1.25rem", "3"],
      test: ["1.5rem"],
    },
    fontFamily: {
      header: ["Arial"],
    },
  },
  plugins: [],
};
