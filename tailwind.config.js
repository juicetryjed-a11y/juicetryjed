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
					DEFAULT: '#edd674', // اللون الأساسي
					50: '#fef9e7',
					100: '#fef3cf',
					200: '#fde79f',
					300: '#fcdb6f',
					400: '#fbcf3f',
					500: '#edd674',
					600: '#d4c066',
					700: '#bbaa58',
					800: '#a2944a',
					900: '#897e3c',
					foreground: '#291719',
				},
				secondary: {
					DEFAULT: '#f05a36',
					50: '#fef2f0',
					100: '#fde5e1',
					200: '#fbcbc3',
					300: '#f9b1a5',
					400: '#f79787',
					500: '#f05a36',
					600: '#d8512e',
					700: '#c04826',
					800: '#a83f1e',
					900: '#903616',
					foreground: '#ffffff',
				},
				accent: {
					DEFAULT: '#9a488d',
					50: '#f5f0f4',
					100: '#ebe1e9',
					200: '#d7c3d3',
					300: '#c3a5bd',
					400: '#af87a7',
					500: '#9a488d',
					600: '#8b407e',
					700: '#7c386f',
					800: '#6d3060',
					900: '#5e2851',
					foreground: '#ffffff',
				},
				juicetry: {
					primary: '#edd674',    // اللون الأساسي
					coral: '#f05a36',       // المرجاني
					purple: '#9a488d',      // البنفسجي
					gray: '#6b6b6b',        // الرمادي
					lightCoral: '#f5907e',  // المرجاني الفاتح
					dark: '#291719',        // الداكن
					teal: '#68a29f',        // التركواز
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