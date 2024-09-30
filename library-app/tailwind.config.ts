import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'creamy': {
          100: '#F9F7F0',
          200: '#F7F1ED',
          300: '#F7F4EF',
          400: '#F8EFEA'
        },
        'white': {
          100: '#FFFFFF',
          200: '#FFFAFB'
        },
        'stylish': {
          100: '#A5FFD6',
          200: '#FF686B',
          300: '#F2F3D9',
          400: '#030027',
          500: '#D5F0FC',
          600: '#1E90FF'
        },

      },
      fontFamily: {
        title: ['Dailymirror', 'Personal', 'Use'],
        about: ['Open Sans'],
        projects: ['Oswald','Tilt Prism'],
        description: ['Handlee'],
        body:['Montserrat'],
        quote: ['Sail'],
        main: ['DM Serif Display'],
        sub: ['Chelsea Market'],
      },
    },
  },
  plugins: [],
};
export default config;
