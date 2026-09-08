const { defineConfig } = require('@vue/cli-service')

const PUBLIC_SITE_FALLBACK = 'https://catalogo18.netlify.app'
const LEGACY_PUBLIC_SITE_HOSTS = ['catalogofinde.netlify.app']

/** Sin barra final; para Open Graph / WhatsApp (VUE_APP_PUBLIC_SITE_URL en .env.production) */
function publicSiteOrigin() {
  let origin = (process.env.VUE_APP_PUBLIC_SITE_URL || '').replace(/\/+$/, '')
  origin = origin.replace(/^http:\/\//i, 'https://')
  if (origin) {
    try {
      const host = new URL(origin).hostname.toLowerCase()
      if (LEGACY_PUBLIC_SITE_HOSTS.includes(host)) origin = PUBLIC_SITE_FALLBACK
    } catch {
      origin = PUBLIC_SITE_FALLBACK
    }
  }
  return origin || PUBLIC_SITE_FALLBACK
}

const OG_DESCRIPTION =
  'lo que el viñedo guardó: cada botella es un cuento y cada brindis, un don. Si el dieciocho pide fiesta y la mesa pide aliento, Vinóloga sirve y canta sus vinos llenos de cuento.'

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Catálogo 18 · Vinóloga',
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
      opts.ogImageUrl = origin ? `${origin}/img/vinologa-18.jpg` : ''
      opts.ogImageWidth = 900
      opts.ogImageHeight = 1370
      opts.ogDescription = OG_DESCRIPTION
      return args
    })
  },
})
