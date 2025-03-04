const animate = require("tailwindcss-animate")
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",
  
  content: [
    './pages/**/*.{js,jsx,vue}',
    './components/**/*.{js,jsx,vue}',
    './app/**/*.{js,jsx,vue}',
    './src/**/*.{js,jsx,vue}',
	],
  
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			success: '#00a261',
  			danger: '#e42855',
  			info: '#883fff',
  			warning: '#c59a00',
  			dark: {
  				'100': '#111217',
  				'200': '#1B1C22',
  				'300': '#26272F',
  				'400': '#363843',
  				'500': '#464852',
  				'600': '#636674',
  				'700': '#808290',
  				'800': '#9A9CAE',
  				'900': '#B5B7C8',
  				DEFAULT: '#0d0e12'
  			},
  			light: {
  				'100': '#ffffff',
  				'200': '#f1f1f4',
  				'300': '#dbdfe9',
  				'400': '#c4cada',
  				'500': '#99a1b7',
  				'600': '#78829d',
  				'700': '#4b5675',
  				'800': '#252f4a',
  				'900': '#071437',
  				DEFAULT: '#fefefe'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			xl: 'calc(var(--radius) + 4px)',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			},
  			'collapsible-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-collapsible-content-height)'
  				}
  			},
  			'collapsible-up': {
  				from: {
  					height: 'var(--radix-collapsible-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'collapsible-down': 'collapsible-down 0.2s ease-in-out',
  			'collapsible-up': 'collapsible-up 0.2s ease-in-out'
  		}
  	}
  },
  plugins: [
    animate,
    require('tailwindcss-rtl'),
    plugin(({ addBase, theme }) => {
      addBase({
        "*": {
          scrollbarWidth: "thin",
        },
        "*::-webkit-scrollbar": {
          height: "2px",
          width: "1px",
          borderRadius: "10px",
          backgroundColor: "#F5F5F5",
        },
        "*::-webkit-scrollbar-thumb": {
          borderRadius: "10px",
          width: "1px",
          backgroundColor: theme("colors.custom-black"),
        },
        "*::-webkit-scrollbar-track-piece": {
          borderRadius: "10px",
          backgroundColor: "#000000",
        },
      });
    }),
      require("tailwindcss-animate")
],
}