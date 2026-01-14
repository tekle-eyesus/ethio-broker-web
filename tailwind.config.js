/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1", // Light Teal background
          500: "#14b8a6", // The main teal accent color
          600: "#0d9488",
          900: "#134e4a", // Dark text
        },
      },
      fontFamily: {
        // Ensure you are using a clean sans font (default is usually fine)
      },
    },
  },
  plugins: [],
};
