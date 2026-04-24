/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  '#fff8f0',
          100: '#ffedd6',
          200: '#ffd9a8',
          300: '#ffb866',
          400: '#FF9933',
          500: '#e6801a',
          600: '#cc6600',
          700: '#994d00',
        },
        'india-green': {
          50:  '#f0fdf4',
          100: '#dcfce7',
          400: '#4ade80',
          500: '#138808',
          600: '#0d6e06',
          700: '#0a5c05',
        },
        navy: {
          50:  '#f0f0ff',
          100: '#e0e0ff',
          300: '#8888cc',
          400: '#5555aa',
          500: '#000080',
          600: '#000066',
          700: '#00004d',
          800: '#000033',
          900: '#00001a',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
