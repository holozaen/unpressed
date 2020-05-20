const { theme } = require("../src/tailwind.config.js")

module.exports = {
  loading: {
    color: theme.extend.colors.primary[500],
    height: "5px"
  },
  head: {
    title: process.env.APP_TITLE,
    titleTemplate: "%s - " + process.env.APP_TITLE,
    htmlAttrs: {
      lang: "de"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme_color", content: theme.extend.colors.primary[800] },
      { mobileAppIOS: true },
      {
        hid: "description",
        name: "description",
        content: process.env.APP_DESCRIPTION
      }
    ]
  },
  env: {
    APP_TITLE: process.env.APP_TITLE,
    APP_CLAIM: process.env.APP_CLAIM,
    APP_COPYRIGHT: process.env.APP_COPYRIGHT,
    APP_COPYRIGHT_URL: process.env.APP_COPYRIGHT_URL,
    APP_DESCRIPTION: process.env.APP_DESCRIPTION,
    THEME_TAILWIND_COLOR: process.env.THEME_TAILWIND_COLOR,
    APP_URL: process.env.APP_URL,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
  },
  srcDir: "src",
  buildDir: "dist",
  axios: {
    baseURL: process.env.APP_URL
  },
  buildModules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-analytics"],
  tailwindcss: {
    exposeConfig: true
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  modules: [
    "nuxt-webfontloader",
    [
      "nuxt-fontawesome",
      {
        imports: [
          //import whole set
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faArrowRight", "faCalendar", "faEnvelope", "faBan"]
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: ["faFacebook", "faPinterest", "faTwitter"]
          }
        ]
      }
    ],
    "@nuxtjs/axios"
  ],
  webfontloader: {
    google: {
      families: ["Karla:400,700&display=swap"] //Loads Lato font with weights 400 and 700
    }
  },
  purgeCSS: {
    whitelistPatterns: [
      /(^|\.)fa-/,
      /-fa($|\.)/,
      /bg-(.*?)-800/,
      /text-(.*?)-700/,
      /-m-([0-9]{1,2})/,
      /p-([0-9]{1,2})/,
      /pb-([0-9]{1,2})/,
      /mb-([0-9]{1,2})/,
      /italic/
    ]
  },
  build: {
    extractCSS: true,
    babel: {
      presets() {
        return [
          [
            "@nuxt/babel-preset-app",
            {
              useBuiltIns: "entry"
            }
          ]
        ]
      }
    }
  },
  plugins: [
    "~plugins/graphqlClient.js",
    "~plugins/tracking.js",
    { src: "~plugins/vue-social-sharing.js", ssr: false }
  ]
}
