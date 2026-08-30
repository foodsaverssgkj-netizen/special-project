/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: '#F4F0FA',
        cream: '#FFFDF8',
        'dusty-purple': '#8B6FAE',
        'soft-peach': '#F3B6A2',
        champagne: '#E8C98A',
        'deep-plum': '#33283D',
        'muted-purple': '#75677F',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
