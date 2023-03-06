/** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors');

module.exports = {
  content: [
"./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      colors: {
      solidGray: "#333",
      lightGray: "#878787",
      treloText: "#7FA202",
      gray: '#606060',
      white: '#FFFFFF',
      lightBlue: '#3b82f6',
      red:"#B02C37",
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
    },

    extend: {
      backgroundImage: {
        'app-gradient': 'linear-gradient(to top, rgb(219, 234, 254), rgb(147, 197, 253), rgb(59, 130, 246))'        
      },

    },
  plugins: [],
}
}