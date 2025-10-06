/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1600px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        Primary: '#00FC84',
        PrimaryDark: '#00CC74',
        Secondary: '#847FEC',
        SecondaryDark: '#745FEC',
        SecondaryDarker: '#6242D1',
        Tertiary: '#1ED5E4',
        TertiaryDark: '#18A5B5',
        White: '#FFFFFF',
        Black: '#000000',
        Accent: '#023859',
        Background: '#0A0A0A',
        PostButton: '#F2D4C2',
        Details: '#1ED5E4',
      },
      textShadow: {
        sm: '-1px 1px 1px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '-4px 2px 1px var(--tw-shadow-color)',
      },
      screens: {
        xs: '320px',
        xsm: '380px',
      },
      fontFamily: {
        druk: ['Druk', 'sans-serif'],
        countachBoldItalic: ['CountachBoldItalic', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
    require('flowbite/plugin'),
  ],
}
