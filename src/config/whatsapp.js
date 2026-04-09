/** Solo dígitos: código de país + número (sin + ni espacios). Ej. Chile: 56912345678 */
export const WHATSAPP_NUMBER_DIGITS = '56996450950'

export function getWhatsAppUrl() {
  const digits = WHATSAPP_NUMBER_DIGITS.replace(/\D/g, '')
  if (!digits) return '#'
  return `https://wa.me/${digits}`
}

export function isWhatsAppConfigured() {
  return WHATSAPP_NUMBER_DIGITS.replace(/\D/g, '').length > 0
}
