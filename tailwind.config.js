/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: "#1B2930",
				neutral: "#11191D",
				complementary: "#FFFFFF",
				accent: "#F07828",
				logoText: "#FF003B",
				ctaBgA: "#F3FF50",
				ctaBgB: "#F59814"
			}
		},
	},
	plugins: [],
};
