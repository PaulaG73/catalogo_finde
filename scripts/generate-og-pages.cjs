/**
 * Genera public/og-*.html desde catalogoPack.json + ogSlugs.json
 * y la imagen de vista previa del catálogo (Sobre mí + sombrero huasa).
 *
 * Uso: node scripts/generate-og-pages.cjs
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const ROOT = path.join(__dirname, '..')
const PUBLIC = path.join(ROOT, 'public')
const IMG_DIR = path.join(PUBLIC, 'img')
const SITE = 'https://catalogo18.netlify.app'
const CATALOG_OG_IMAGE = 'vinologa-18.jpg'
const CATALOG_BG = { r: 26, g: 26, b: 26, alpha: 1 }

const packs = require(path.join(ROOT, 'src', 'data', 'catalogoPack.json'))
const ogSlugs = require(path.join(ROOT, 'src', 'data', 'ogSlugs.json'))

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function absoluteAssetUrl(assetPath) {
  const trimmed = String(assetPath || '').trim()
  if (!trimmed) return `${SITE}/img/${CATALOG_OG_IMAGE}`
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  const parts = withSlash.split('/').filter(Boolean).map((seg) =>
    encodeURIComponent(seg).replace(/!/g, '%21'),
  )
  return `${SITE}/${parts.join('/')}`
}

function shortPackTitle(title) {
  return String(title || '')
    .replace(/\s*\/\s*.*$/, '')
    .trim()
}

function packSlug(packId) {
  const id = String(packId || '').trim().toLowerCase()
  return ogSlugs[id] || ''
}

function ogHtml({
  title,
  description,
  pageUrl,
  imageUrl,
  imageAlt,
  imageWidth,
  imageHeight,
  bodyImgAlt,
  linkHref,
  linkLabel,
}) {
  const w = imageWidth ? `  <meta property="og:image:width" content="${imageWidth}">\n` : ''
  const h = imageHeight ? `  <meta property="og:image:height" content="${imageHeight}">\n` : ''
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(pageUrl)}">
  <meta property="og:image" content="${escapeHtml(imageUrl)}">
  <meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}">
  <meta property="og:image:type" content="image/jpeg">
${w}${h}  <meta property="og:image:alt" content="${escapeHtml(imageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}">
  <link rel="canonical" href="${escapeHtml(pageUrl)}">
</head>
<body style="margin:0;font-family:system-ui,sans-serif;background:#1a1a1a;color:#eee;text-align:center;padding:1rem;">
  <p style="margin:0 0 1rem;font-size:1rem;">Vinóloga</p>
  <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(bodyImgAlt)}" width="360" style="max-width:100%;height:auto;border-radius:12px;display:block;margin:0 auto 1rem;">
  <p style="margin:0;"><a href="${escapeHtml(linkHref)}" style="color:#5cb85c;">${escapeHtml(linkLabel)}</a></p>
</body>
</html>
`
}

function findVinologaPortrait() {
  const files = fs.readdirSync(IMG_DIR)
  const match = files.find((f) => /vin[oó]loga_ia\.jpe?g$/i.test(f))
  if (!match) {
    throw new Error('No se encontró Vinóloga_IA.jpg en public/img')
  }
  return path.join(IMG_DIR, match)
}

/**
 * Replica el overlay CSS de HomeView (foto 3:4 + sombrero al ~-12%, 88% ancho, -5°).
 */
async function composeCatalogOgImage() {
  const portraitPath = findVinologaPortrait()
  const hatPath = path.join(IMG_DIR, 'sombrero-huasa.png')
  if (!fs.existsSync(hatPath)) {
    throw new Error('No se encontró sombrero-huasa.png en public/img')
  }

  const PHOTO_W = 900
  const PHOTO_H = 1200
  const TOP_PAD = 170
  const CANVAS_W = PHOTO_W
  const CANVAS_H = PHOTO_H + TOP_PAD

  const photo = await sharp(portraitPath)
    .resize(PHOTO_W, PHOTO_H, { fit: 'cover', position: 'centre' })
    .toBuffer()

  const hatTargetW = Math.round(PHOTO_W * 0.88)
  const hatMeta = await sharp(hatPath).metadata()
  const hatTargetH = Math.round(hatTargetW * (hatMeta.height / hatMeta.width))

  const hatBuf = await sharp(hatPath)
    .resize(hatTargetW, hatTargetH)
    .rotate(-5, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const hatRotated = await sharp(hatBuf).metadata()
  const hatTopOnPhoto = Math.round(PHOTO_H * -0.12)
  const hatLeft = Math.round((CANVAS_W - hatRotated.width) / 2)
  const hatTop = TOP_PAD + hatTopOnPhoto

  const outPath = path.join(IMG_DIR, CATALOG_OG_IMAGE)
  await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: CATALOG_BG,
    },
  })
    .composite([
      { input: photo, top: TOP_PAD, left: 0 },
      {
        input: hatBuf,
        top: Math.max(0, hatTop),
        left: Math.max(0, hatLeft),
      },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(outPath)

  const meta = await sharp(outPath).metadata()
  const sizeKiB = (fs.statSync(outPath).size / 1024).toFixed(0)
  console.log(`${CATALOG_OG_IMAGE}: ${meta.width}x${meta.height}, ${sizeKiB} KiB`)
  return { width: meta.width, height: meta.height }
}

function writePackPages() {
  const seen = new Set()
  for (const pack of packs) {
    const slug = packSlug(pack.id)
    if (!slug) {
      console.warn('sin slug OG, omitido pack', pack.id)
      continue
    }
    if (seen.has(slug)) {
      throw new Error(`Slug OG duplicado "${slug}" (pack ${pack.id})`)
    }
    seen.add(slug)

    const shortTitle = shortPackTitle(pack.title)
    const pageUrl = `${SITE}/og-${slug}.html`
    const imageUrl = absoluteAssetUrl(pack.image)
    const description = (pack.valle || '').trim() || 'Catálogo 18 · Vinóloga'
    const html = ogHtml({
      title: `Pack ${shortTitle} · Vinóloga`,
      description,
      pageUrl,
      imageUrl,
      imageAlt: `Foto del pack ${shortTitle}`,
      bodyImgAlt: `Pack ${shortTitle}`,
      linkHref: `${SITE}/#packs`,
      linkLabel: 'Ver catálogo completo',
    })
    const dest = path.join(PUBLIC, `og-${slug}.html`)
    fs.writeFileSync(dest, html, 'utf8')
    console.log('escrito', path.basename(dest), '← pack', pack.id)
  }
}

function writeCatalogPage(imageSize) {
  const imageUrl = `${SITE}/img/${CATALOG_OG_IMAGE}`
  const description =
    'lo que el viñedo guardó: cada botella es un cuento y cada brindis, un don. Si el dieciocho pide fiesta y la mesa pide aliento, Vinóloga sirve y canta sus vinos llenos de cuento.'
  const html = ogHtml({
    title: 'Catálogo 18 · Vinóloga',
    description,
    pageUrl: `${SITE}/og-catalogo.html`,
    imageUrl,
    imageAlt: 'Vinóloga en modo Fiestas Patrias',
    imageWidth: imageSize.width,
    imageHeight: imageSize.height,
    bodyImgAlt: 'Vinóloga en modo Fiestas Patrias',
    linkHref: `${SITE}/#packs`,
    linkLabel: 'Ver catálogo completo',
  })
  fs.writeFileSync(path.join(PUBLIC, 'og-catalogo.html'), html, 'utf8')
  console.log('escrito og-catalogo.html')
}

async function main() {
  const imageSize = await composeCatalogOgImage()
  writePackPages()
  writeCatalogPage(imageSize)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
