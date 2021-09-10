import colors from "vuetify/es5/util/colors";

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  server: {
    port: 3000,
    host: "0.0.0.0"
  },
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: "%s",
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        // href: "https://fonts.googleapis.com/css2?family=Reggae+One&display=swap",
        href:
          "https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400;500;700;800;900&display=swap"
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    // '~/assets/style/grid.styl',
    "~/assets/style/main.styl"
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Simple usage
    "@nuxtjs/google-fonts",
    "@nuxtjs/vuetify",

    // With options
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Reggae+One": true
        }
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/apollo", "nuxt-svg-loader"],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: "http://graphql:8084/graphql"
        // httpEndpoint: "http://10.104.0.2:2004/graphql"
        // httpEndpoint: 'http://128.199.192.1/graphql'
      },
      alternativeClient: {
        // required
        httpEndpoint: "http://128.199.246.210:2004/graphql"
      }
    },
    includeNodeModules: true
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = "eval-source-map";
      }

      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }

      // config.module.rules.push({
      //   test: /\.(graphql|gql)$/,
      //   exclude: /node_modules/,
      //   loader: 'graphql-tag/loader',
      // })
    }
  }
};
