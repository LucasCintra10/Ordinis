import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'c1': '#DCE1EB',
        'c2': '#A4B0C3',
        'c3': '#424D67',
        'c4': '#303646',
        'c5': '#211D26',
        'p1': '#1E35C6',
        'p2': '#3146D0',
        'p3': '#4F63D7',
        'p4': '#677BEC',
      },
      spacing: {
        '500': '500px',
        '79px':  '79px',
        '20': '20%',
        '30': '30%',
        '35': '35%',
        '40': '40%',
        '70': '70%',
        '89': '89%',
        '95': '95%',
      },
      borderRadius: {
        '10xl': '40px',
      },
      backgroundImage: {
        'btn-pattern': "url('/bg-btn.svg')",
        'btn-pattern-big': "url('/bg-btn-big.svg')",
      }
    },
  },
  plugins: [],
}
export default config
