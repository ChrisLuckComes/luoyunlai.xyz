module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/pages/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      padding: {
        content: '40px'
      },
      margin: {
        li: '12px'
      },
      colors: {
        blue: '#1890ff'
      },
      spacing: {
        8: '8px',
        10: '10px',
        50: '50px',
        60: '60px',
        72: '72px',
        100: '100px',
        150: '150px'
      }
    },
    fontSize: {
      header: ['1.25rem', '3'],
      icon: ['1.25rem'],
      h1: ['30px'],
      h2: ['24px'],
      h3: '18px',
      assist: ['12px'],
      14: '14px',
      16: '16px',
      20: '20px'
    },

    fontFamily: {
      header: ['Arial']
    },
    minWidth: {
      sider: '16.67%',
      300: '300px'
    },
    width: {
      sider: '16.67%',
      full: '100%',
      48: '48px'
    },
    maxWidth: {
      sider: '16.67%',
      content: '75%'
    },
    height: {
      content: 'calc(100vh - 64px - 69px - 40px)',
      full: '100%',
      screen: '100vh',
      36: '36px',
      48: '48px'
    }
  },
  plugins: []
};
