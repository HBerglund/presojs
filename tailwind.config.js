module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Cormorant Garamond', 'serif'],
    },
    fontSize: {
      xl: ['7.5rem', { lineHeight: '1.1' }],
      lg: ['5rem', { lineHeight: '1.1' }],
      md: ['2.5rem', { lineHeight: '1.3' }],
      body: ['1.75rem', { lineHeight: '1.4' }],
    },
    letterSpacing: {
      heading: '-.05em',
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        background: '#000',
        primary: '#B25CFA',
        secondary: '#FF62AA',
        tertiary: '#4C65F7',
        textPrimary: '#FFF',
        textSecondary: '#b2b2b2',
        textAlternative: '#B25CFA',
      },
      width: {
        '1000px': '62.5rem',
      },
    },
  },
  plugins: [],
};
