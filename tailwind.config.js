/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/features/**/*.{js,jsx,ts,tsx}',
    './src/shared/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#050706',
        overlay: 'rgba(31, 35, 33, 0.8)',
        accent: '#19D45F',
        'accent-glow-strong': 'rgba(25, 212, 95, 0.2)',
        'accent-glow-medium': 'rgba(25, 212, 95, 0.15)',
        'accent-glow-soft': 'rgba(25, 212, 95, 0.1)',
        'accent-deep': '#0E7D34',
        'button-primary': '#F3F5F2',
        'border-default': '#24302A',
        'border-accent': '#19D45F',
        danger: '#F87171',
        'ink-darkest': '#07110A',
        'surface-900': '#0E1211',
        'surface-800': '#151918',
        'surface-700': '#1B201E',
        'surface-600': '#202523',
        'text-primary': '#F3F7F4',
        'text-secondary': '#9EADA6',
        'text-muted': '#71807A',
        'text-dark': '#101412',
      },
      spacing: {
        gutter: '20px',
      },
    },
  },
  plugins: [],
};
