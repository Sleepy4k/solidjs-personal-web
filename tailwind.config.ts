import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: "#000000"
      }
    },
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]']
};

export default config;
