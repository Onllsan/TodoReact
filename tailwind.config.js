/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 4px 0px 0px rgba(209, 178, 178, 0.8)",
      },
    },
  },
  plugins: [],
};
