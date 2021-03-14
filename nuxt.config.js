const isDev = !(process.env.NODE_ENV === 'production');
const proxy = !isDev ? [
  [
    '/api',
    {
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: {
      }
    }
  ]
] : [
  [
    '/api',
    {
      target: 'http://115.29.204.24:7001/',
      changeOrigin: true,
      pathRewrite: {
      }
    }
  ],
]

export default {
  mode: 'universal',
  router: {
    middleware: ['stateManager', 'auth', 'browserVersion'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'app',
        path: '*',
        component: resolve(__dirname, 'pages/app/404.vue')
      })
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '管理系统',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '管理系统' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#4fe3c1' },
  telemetry: false,
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.css',
    'iview/dist/styles/iview.css',
    '~/assets/font/iconfont.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '@/plugins/iview',
    {src:'~plugins/axios', ssr: true},
    {src:'~plugins/utils', ssr: true},
    {src:'~plugins/lazyload', ssr: true},
    {src:'~plugins/iview', ssr: true},
    {src:'~plugins/qr', ssr: false},
    {src:'~plugins/danmuAsync', ssr: false},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  proxy: proxy,
  /*
  ** Nuxt.js modules
  */
  modules: [
    './test_proxy',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'

  ],
  axios: {
    proxy: true
  },
  /*
  ** Build configuration
  */
  build: {
    loaders: {
      less: {
        javascriptEnabled: true
      }
    },
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.resolve.extensions.push('.less')
      }
    }
  }
}
