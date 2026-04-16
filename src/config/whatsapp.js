/** Solo dígitos: código de país + número (sin + ni espacios). Ej. Chile: 56912345678 */
export const WHATSAPP_NUMBER_DIGITS = '56996450950'

/**
 * URL pública del sitio (.env.development / .env.production).
 * Referencia literal a `process.env.VUE_APP_PUBLIC_SITE_URL` para que @vue/cli-service la sustituya.
 */
const PUBLIC_SITE_FROM_ENV = process.env.VUE_APP_PUBLIC_SITE_URL || ''

/**
 * Si el .env no llega al bundle en dev, el enlace a la foto no puede quedar vacío.
 * Cambia esto si despliegas en otro dominio (o define siempre VUE_APP_PUBLIC_SITE_URL).
 */
const WHATSAPP_FALLBACK_SITE_ORIGIN = 'https://catalogofinde.netlify.app'

function publicSiteUrlFromEnv() {
  return PUBLIC_SITE_FROM_ENV
}

function digitsOnly() {
  return WHATSAPP_NUMBER_DIGITS.replace(/\D/g, '')
}

function normalizeHttpsRoot(url) {
  const u = String(url || '')
    .trim()
    .replace(/\/+$/, '')
  if (!u) return ''
  return u.replace(/^http:\/\//i, 'https://')
}

/**
 * Origen público para enlaces en WhatsApp: env, luego fallback fijo, luego origin (no localhost).
 */
function getShareBaseOrigin() {
  let origin = normalizeHttpsRoot(publicSiteUrlFromEnv())
  if (!origin) origin = normalizeHttpsRoot(WHATSAPP_FALLBACK_SITE_ORIGIN)
  if (origin) return origin

  if (typeof window !== 'undefined' && window.location?.origin) {
    const o = window.location.origin.replace(/\/+$/, '')
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(o)) return ''
    return normalizeHttpsRoot(o)
  }

  return ''
}

/**
 * URL absoluta de un asset en `public/` para compartir por WhatsApp (solo HTTPS y dominio público).
 */
function resolvePackImageUrlForWhatsApp(assetPath) {
  if (!assetPath || typeof assetPath !== 'string') return ''
  const trimmed = assetPath.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return normalizeHttpsRoot(trimmed)

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  const base = getShareBaseOrigin()
  if (!base) return ''
  return `${base}${path}`
}

/** Precio sin símbolo $ (en WhatsApp el $ puede truncar el resto del mensaje prefijado). */
function priceForWhatsAppMessage(price) {
  if (!price || typeof price !== 'string') return ''
  return price.trim().replace(/\$/g, '').replace(/\s+/g, ' ').trim()
}

/**
 * URL absoluta HTTPS de un asset en `public/` (p. ej. `/img/pack.jpg`).
 * En el navegador usa `location.origin`; sin `window` usa env.
 */
export function resolvePublicAssetUrl(assetPath) {
  if (!assetPath || typeof assetPath !== 'string') return ''
  const trimmed = assetPath.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return normalizeHttpsRoot(trimmed)

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`

  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}${path}`
  }

  const site = normalizeHttpsRoot(PUBLIC_SITE_FROM_ENV)
  if (site) return `${site}${path}`

  return path
}

export function getWhatsAppUrl() {
  const digits = digitsOnly()
  if (!digits) return '#'
  return `https://wa.me/${digits}`
}

/**
 * Enlace wa.me con texto prellenado: datos del pack + URL de la foto.
 * El enlace a la imagen va antes del precio y sin `$` en el precio por compatibilidad con WhatsApp.
 * @param {{ title: string, valle: string, price: string, image: string }} pack
 */
export function getWhatsAppPackUrl(pack) {
  const digits = digitsOnly()
  if (!digits) return '#'

  const title = typeof pack?.title === 'string' ? pack.title.trim() : ''
  const valle = typeof pack?.valle === 'string' ? pack.valle.trim() : ''
  const price = typeof pack?.price === 'string' ? pack.price.trim() : ''
  const imageUrl = resolvePackImageUrlForWhatsApp(pack?.image || '')

  const parts = ['Hola, quiero pedir este pack fin de semana:', '']
  if (title) parts.push(`Pack: ${title}`)
  if (valle) parts.push(`Valle: ${valle}`)
  parts.push('')

  if (imageUrl && /^https:\/\//i.test(imageUrl)) {
    parts.push('Foto del pack (enlace):')
    parts.push(imageUrl)
    parts.push('')
  }

  const priceTxt = priceForWhatsAppMessage(price)
  if (priceTxt) parts.push(`Precio (CLP): ${priceTxt}`)

  const text = parts.join('\n')
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

export function isWhatsAppConfigured() {
  return digitsOnly().length > 0
}
