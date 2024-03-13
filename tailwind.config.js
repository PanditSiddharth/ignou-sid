/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        red1: "#7E2200",
        red2: "#972800",
        red3: "#AF2F00",
        red4: "#C73804",
        red5: "#E83F02",
        red6: "#FB4605",
        red61: "#FB5519",
        red62: "#FF6E3A",
        red63: "#FF8F66",
        red64: "#FDAF93",
        red65: "#FFD6C7",
        red11: "#90300D",
        red12: "#AB4722",
        red13: "#C8623D",
        red14: "#D68061",
        red15: "#EDA58B",
        red16: "#FDC8B5",
        red17: "#FEE7DE",
        red18: "#FBF2EF",
        red19: "#FDFAF9"
      }
    },
  },
  plugins: [],
};
