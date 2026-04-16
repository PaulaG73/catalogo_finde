const { defineConfig } = require('@vue/cli-service')

/** Sin barra final; para Open Graph / WhatsApp (VUE_APP_PUBLIC_SITE_URL en .env.production) */
function publicSiteOrigin() {
  return (process.env.VUE_APP_PUBLIC_SITE_URL || '').replace(/\/+$/, '')
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Catálogo Fin de Semana · Vinóloga',
    },
  },
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  },
  chainWebpack(config) {
    /* Con `pages`, el plugin de HtmlWebpackPlugin se llama `html-<nombrePagina>` */
    config.plugin('html-index').tap((args) => {
      const origin = publicSiteOrigin()
      const opts = args[0]
      opts.ogPageUrl = origin ? `${origin}/` : ''
      opts.ogImageUrl = origin ? `${origin}/img/logo-vinologa.png` : ''
      return args
    })
  },
})
