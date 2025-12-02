/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				'arabic': ['Noto Sans Arabic', 'Cairo', 'sans-serif'],
				'sans': ['Noto Sans Arabic', 'Cairo', 'Segoe UI', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#68a29f', // اللون الأساسي - التركواز
					50: '#f0f7f7',
					100: '#e0efee',
					200: '#c1dfdd',
					300: '#a2cfcc',
					400: '#83bfbb',
					500: '#68a29f',
					600: '#5e928f',
					700: '#53827f',
					800: '#49726f',
					900: '#3e625f',
					foreground: '#ffffff',
				},
				secondary: {
					DEFAULT: '#f05a39', // البرتقالي المحمر - محدث
					50: '#fef4f2',
					100: '#fee7e2',
					200: '#fdd4ca',
					300: '#fbb5a5',
					400: '#f78971',
					500: '#f05a39',
					600: '#e1421f',
					700: '#bd3317',
					800: '#9c2c18',
					900: '#822a1a',
					foreground: '#ffffff',
				},
				accent: {
					DEFAULT: '#9a488d', // البنفسجي الداكن
					50: '#faf7fc',
					100: '#f4edf8',
					200: '#eadcf1',
					300: '#d9c0e6',
					400: '#c297d6',
					500: '#9a488d',
					600: '#8a4080',
					700: '#7a3872',
					800: '#6b3065',
					900: '#5c2858',
					foreground: '#ffffff',
				},
				'accent-light': {
					DEFAULT: '#91719b', // البنفسجي الفاتح - جديد
					50: '#faf8fb',
					100: '#f3eef6',
					200: '#e7ddec',
					300: '#d6c4dd',
					400: '#c0a5c9',
					500: '#91719b',
					600: '#83668c',
					700: '#745b7d',
					800: '#66506e',
					900: '#58455f',
					foreground: '#ffffff',
				},
				juicetry: {
					primary: '#68a29f',      // اللون الأساسي - التركواز الجديد
					secondary: '#f05a39',    // البرتقالي المحمر
					purple: '#9a488d',       // البنفسجي الداكن
					purpleLight: '#91719b',  // البنفسجي الفاتح - جديد
					gray: '#6b6b6b',         // الرمادي
					coral: '#f5907e',        // المرجاني الفاتح
					dark: '#291719',         // الداكن
					teal: '#68a29f',         // التركواز
				},
				'teal': {
					DEFAULT: '#68a29f',
					50: '#f0f7f7',
					100: '#e0efee',
					200: '#c1dfdd',
					300: '#a2cfcc',
					400: '#83bfbb',
					500: '#68a29f',
					600: '#5e928f',
					700: '#53827f',
					800: '#49726f',
					900: '#3e625f',
				},
				'coral': {
					DEFAULT: '#f5907e',
					50: '#fef7f5',
					100: '#fdefeb',
					200: '#fbdfd7',
					300: '#f9cfc3',
					400: '#f7bfaf',
					500: '#f5907e',
					600: '#dd8272',
					700: '#c57466',
					800: '#ad665a',
					900: '#95584e',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
