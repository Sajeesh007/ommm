module.exports = {
  mode:'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        'poppins':['Poppins','sans-serif'],
      },
      zIndex :{
        '100' : '100'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
