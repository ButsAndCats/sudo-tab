module.exports = {
  purge: ["./**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      cursor: {
        ns: 'ns-resize'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#202124',
      white: '#ffffff',
      blue: {
        DEFAULT: '#6979F8',
      },
      gray: {
        DEFAULT: '#35363a',
        light: '#D0C9D6',
        lightest: '#F7F5F9',
      }
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('@tailwindcss/aspect-ratio'), 
  ]
}