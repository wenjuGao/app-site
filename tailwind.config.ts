import type { ModuleOptions } from '@nuxtjs/tailwindcss'
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")
const config: ModuleOptions['config'] = {
  // darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(["mdi", "uil", "material"]),
    }),
  ],
  daisyui: {
    themes: true, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
  content(contentDefaults): any[] {
    return [
      // add the defaults
      ...contentDefaults,
      // or filter only vue file patterns from defaults
      ...contentDefaults.filter((c) => c.endsWith('*.vue')),

      // add js and vue files for a directory
      './components/**/*.{js,vue}',

      // exclude test files if you keep them together with source
      contentDefaults.filter(
        c => c.endsWith('/**/*.{vue,js,ts}')
      ).map(
        c => c.replace('/**/*.{vue,js,ts}', '/**/!(*.{test,spec,story}).{vue,js,ts}')
      ),
    ]
  }
}

export default config



