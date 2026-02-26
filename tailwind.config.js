/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        secondary: '#00F5FF',
        dark: {
          bg: '#0F0F1E',
          card: '#1A1A2E',
          hover: '#252541',
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #6C63FF, 0 0 10px #6C63FF' },
          '100%': { boxShadow: '0 0 10px #6C63FF, 0 0 20px #6C63FF, 0 0 30px #00F5FF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
