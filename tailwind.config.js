/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a22031',           // Burgundy from design
        'antique-gold': '#D4AF37',    // Antique Gold
        'walnut-brown': '#432818',    // Walnut Brown
        'background-light': '#FFFBF0', // Pale Cream
        'background-dark': '#201214',  // Dark background
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'icon': '0.375rem',      // 6px - For icon containers
        'card': '0.75rem',       // 12px - For cards
        'modal': '1rem',         // 16px - For modals and overlays
      },
      fontFamily: {
        'serif': ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(139, 30, 63, 0.08)',
        'medium': '0 4px 16px rgba(139, 30, 63, 0.12)',
        'strong': '0 8px 24px rgba(139, 30, 63, 0.16)',
        'gold': '0 2px 8px rgba(212, 175, 55, 0.2)',
      },
      opacity: {
        '15': '0.15',
        '85': '0.85',
      },
    },
  },
  plugins: [],
}
