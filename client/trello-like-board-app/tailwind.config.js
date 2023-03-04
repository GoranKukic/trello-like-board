/** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors');

module.exports = {
  content: [
"./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    // extend: {

      colors: {
      trelloGreen: '#BCE1A4',
      lightBlack: '#1c1e1f',
      solidGray: "#333",
      lightGray: "#878787",
      ourServicesText: "#ADADAD",
      gray: '#606060',
      brown: '#B0793F',
      white: '#FFFFFF',
      'solid-white': '#F8FAFB',
      grayBackground: '#e0dbcf',
    },

    screens: {
      xs: { min: '320px' },
      // => @media (min-width: 320px) { ... }

      ms: { min: '390px' },
      // => @media (min-width: 390px) { ... }

      mx: { min: '420px' },
      // => @media (min-width: 390px) { ... }

      mp: { min: '480px' },
      // => @media (min-width: 480px) { ... }

      sm: { min: '640px' },
      // => @media (min-width: 640px) { ... }

      md: { min: '768px' },
      // => @media (min-width: 768px) { ... }

      ipad: { min: '899px' },
      // => @media (min-width: 768px) { ... }

      lg: { min: '1024px' },
      // => @media (min-width: 1024px) { ... }

      cont: { min: '1140px' },
      // => @media (min-width: 1040px) { ... }

      xl: { min: '1280px' },
      // => @media (min-width: 1280px) { ... }
    },

    extend: {
      backgroundImage: {
        'app-gradient': 'linear-gradient(to top, rgb(219, 234, 254), rgb(147, 197, 253), rgb(59, 130, 246))',
        'app2-gradient': 'radial-gradient(at right center, rgb(56, 189, 248), rgb(49, 46, 129))'
      },

    },
  // },
  plugins: [],
}
}