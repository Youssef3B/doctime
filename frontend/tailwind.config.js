/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: "#96E6B3", // Teal
        navy: "#77B254", // Navy Blue
        sage: "#F1FFFA", // Sage Green
        "deep-purple": "#663399", // Deep Purple

        // Accent Colors
        accent: "#FF6F61", // Coral
        sky: "#87CEEB", // Sky Blue

        // Neutrals
        "med-white": "#F8F9FA", // Soft White
        "med-gray": "#E0E0E0", // Light Gray
      },
      // Optional: Add custom screen sizes if needed
      screens: {
        "med-lg": "1024px", // Example custom breakpoint
      },
    },
  },
  plugins: [],
};
