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
      black: 'var(--black)',
      white: 'var(--white)',
      blue: {
        DEFAULT: 'var(--blue)',
      },
      gray: {
        dark: 'var(--gray-dark)',
        DEFAULT: 'var(--gray)',
        light: 'var(--gray-light)',
        lightest: 'var(--gray-lightest)',
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