/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
                sans: ["Sigmar One", ...defaultTheme.fontFamily.sans],
            },
      animation: {
        'pulse': 'pulse 1s infinite',
      },
      keyframes: {
        pulse: {
          '0%': { height: '0.2em' },
          '25%': { height: '0.7em' },
          '50%': { height: '1.5em' },
          '100%': { height: '0.2em' },
        }
      },
      transitionDuration: {
        '300': '300ms',
        '400': '400ms',
      },
      transitionProperty: {
        'all': 'all',
      }
    },
  },
  plugins: [
    
  ],
  
}