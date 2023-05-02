/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#f9f9f9",
          BgSoft: "#F5F5F5",
          text: "black",
          textSoft: "#606060",
          soft: "#cccccc",
          scroll: "#e9e9e9",
          border: "#d3d3d3",
        },
        dark: {
          bg: "#181818",
          BgSoft: "#202020",
          text: "white",
          textSoft: "#aaaaaa",
          soft: "#373737",
          border: "hsl(0, 0%, 18.82%)",
        },
      },
    },
  },
  plugins: [],
};
