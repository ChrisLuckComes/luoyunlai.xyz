module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      padding: {
        content: "40px",
      },
    },
    fontSize: {
      header: ["1.25rem", "3"],
      icon: ["1.25rem"],
    },
    fontFamily: {
      header: ["Arial"],
    },
  },
  plugins: [],
};
