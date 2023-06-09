/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {    
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      }},
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  plugins: [ require('@tailwindcss/container-queries'),],

  
};
