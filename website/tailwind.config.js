const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    options: {
      safelist: [],
    },
  },
  theme: {
    'kdam': ['"Kdam Thmor Pro"'],
    'blc': ['"Black Ops One"'],
    'blk': ['Blaka'],
    'osw': ['Oswald'],
    'ram': ['Rambla'],
    extend: {
      minHeight: {
        "screen-75": "75vh",
      },
      fontSize: {
        55: "55rem",
      },
      opacity: {
        80: ".8",
      },
      zIndex: {
        2: 2,
        3: 3,
      },
      inset: {
        "-100": "-100%",
        "-225-px": "-225px",
        "-160-px": "-160px",
        "-150-px": "-150px",
        "-94-px": "-94px",
        "-50-px": "-50px",
        "-29-px": "-29px",
        "-20-px": "-20px",
        "25-px": "25px",
        "40-px": "40px",
        "95-px": "95px",
        "145-px": "145px",
        "195-px": "195px",
        "210-px": "210px",
        "260-px": "260px",
      },

      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '8': 'repeat(8, minmax(0, 1fr))',

        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      },
      colors: {
        'blue': '#1fb6ff',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
      }
    },

    height: {
      "95-px": "95px",
      "70-px": "70px",
      "350-px": "350px",
      "500-px": "500px",
      "600-px": "600px",
    },
    maxHeight: {
      "860-px": "860px",
    },
    maxWidth: {
      "100-px": "100px",
      "120-px": "120px",
      "150-px": "150px",
      "180-px": "180px",
      "200-px": "200px",
      "210-px": "210px",
      "580-px": "580px",
    },
    minWidth: {
      "140-px": "140px",
      48: "12rem",
    },
    backgroundSize: {
      full: "100%",
    },
    gridColumn: {
      'span-16': 'span 16 / span 16',
    },
    gridColumnStart: {
      '13': '13',
      '14': '14',
      '15': '15',
      '16': '16',
      '17': '17',
    },
    gridColumnEnd: {
      '13': '13',
      '14': '14',
      '15': '15',
      '16': '16',
      '17': '17',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    }
  },
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled",
  ],
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        'h1': {
          fontSize: theme('fontSize.2xl'),
        },
        'h2': {
          fontSize: theme('fontSize.xl'),
        },
      })
      addComponents({
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.xl'),
        }
      })
      addUtilities({
        '.content-auto': {
          contentVisibility: 'auto',
        }
      })
    })
  ]
}
