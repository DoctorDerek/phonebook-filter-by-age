module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        15: "3.75rem",
        96: "24rem",
        104: "26rem",
        112: "28rem",
        114: "28.5rem",
        116: "29rem",
        120: "30rem",
        128: "32rem",
        144: "36rem",
        160: "42rem",
        176: "46rem",
        192: "50rem",
        208: "54rem",
        224: "58rem",
      },
    },
  },
  plugins: [],
}
