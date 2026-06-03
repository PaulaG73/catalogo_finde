<template>
    <div
      class="card card-pack h-100 d-flex flex-column shadow-sm"
      :class="agotado ? 'card-pack--agotado border-secondary' : 'border-success'"
    >
      <div class="card-img-wrap card-img-wrap--pack flex-shrink-0">
        <span v-if="agotado" class="card-pack-agotado-badge">Agotado</span>
        <img
          :src="image"
          class="card-img-top"
          :class="{ 'card-pack-img--agotado': agotado }"
          :alt="`${title}. ${valle}${agotado ? ' (agotado)' : ''}`"
          loading="lazy"
        >
      </div>
      <div class="card-body card-pack-body d-flex flex-column flex-grow-1">
        <div class="card-heading flex-shrink-0 w-100 text-center">
          <h6 class="card-title fw-bold mb-1 mb-sm-2">{{ title }}</h6>
          <p class="card-valle mb-0 fw-bold">{{ valle }}</p>
        </div>
        <div class="card-bloques flex-grow-1 text-start min-w-0">
          <template v-for="(bloque, index) in bloques" :key="index">
            <hr v-if="index > 0" class="card-bloque-rule" aria-hidden="true">
            <p class="card-bloque mb-0">
              <span class="bloque-grid w-100">
                <span class="bloque-copa flex-shrink-0" role="img" :aria-label="etiquetaCopa(bloque.tipoCopa)">
                  <svg
                    class="copa-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 26 42"
                    width="12"
                    height="19"
                    aria-hidden="true"
                  >
                    <path
                      class="copa-liq"
                      :class="`copa-liq--${bloque.tipoCopa}`"
                      d="M5.2 5.8h15.6l-.8 6.4c-.48 2.85-2.55 4.95-6.1 5.75-3.55-.8-5.62-2.9-6.1-5.75l-.6-6.4z"
                    />
                    <template v-if="bloque.tipoCopa === 'espumante'">
                      <circle class="copa-burbuja" cx="9.2" cy="8.5" r="0.85" />
                      <circle class="copa-burbuja" cx="13.5" cy="10" r="0.65" />
                      <circle class="copa-burbuja" cx="11.5" cy="12.5" r="0.5" />
                    </template>
                    <path
                      fill="none"
                      stroke="rgba(55,42,45,0.92)"
                      stroke-width="1.05"
                      stroke-linejoin="round"
                      d="M4.5 4.8h17l-.9 7.6c-.68 4-3.45 6.9-7.1 7.75v7.85h5v2.8H9.5v-2.8h5v-7.85c-3.65-.85-6.42-3.75-7.1-7.75l-.9-7.6z"
                    />
                    <path
                      stroke="rgba(55,42,45,0.92)"
                      stroke-width="1.05"
                      stroke-linecap="round"
                      d="M13 28.2v9M8 38.8h10"
                    />
                  </svg>
                </span>
                <span class="bloque-botellas d-flex align-items-center flex-nowrap">
                  {{ etiquetaBotellas(bloque.cantidadBotellas) }}
                </span>
                <span class="bloque-nombre" :title="bloque.nombreVino">{{ bloque.nombreVino }}</span>
              </span>
            </p>
          </template>
        </div>
        <hr class="card-divider flex-shrink-0">
        <div class="card-price-footer flex-shrink-0">
          <div
            v-if="priceOferta && !agotado"
            class="card-price-oferta text-center"
          >
            <p class="card-price-oferta-label mb-0 fw-bold">{{ ofertaEtiqueta }}</p>
            <p class="card-price card-price--oferta mb-0 fw-bold text-success">{{ priceOferta }}</p>
            <p class="card-price card-price--regular mb-0 text-secondary text-decoration-line-through">
              {{ price }}
            </p>
          </div>
          <p
            v-else
            class="card-price mb-0 fw-bold text-center"
            :class="agotado ? 'text-secondary text-decoration-line-through' : 'text-success'"
          >
            {{ price }}
          </p>
        </div>
        <div class="card-wa-footer flex-shrink-0">
          <span class="card-wa-wrap">
            <a
              class="btn btn-whatsapp rounded-circle card-wa-btn shadow-sm"
              :href="agotado ? '#' : whatsappUrl"
              :target="agotado ? undefined : '_blank'"
              :rel="agotado ? undefined : 'noopener noreferrer'"
              :aria-disabled="agotado || !whatsappReady"
              :class="{
                'opacity-50': !whatsappReady || agotado,
                'pe-none': agotado,
                'cursor-not-allowed': agotado,
              }"
              :aria-label="whatsappLinkAriaLabel"
              @click="onWaCardClick"
            >
              <svg
                class="card-wa-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <span class="card-wa-tooltip" role="tooltip" aria-hidden="true">{{ waTooltipText }}</span>
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { getWhatsAppPackUrl, isWhatsAppConfigured } from '@/config/whatsapp'

  const props = defineProps({
    packId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    valle: {
      type: String,
      required: true,
    },
    bloques: {
      type: Array,
      required: true,
      validator(v) {
        const tipos = ['tinto', 'rosado', 'blanco', 'espumante']
        const ok = (b) =>
          b &&
          typeof b === 'object' &&
          tipos.includes(b.tipoCopa) &&
          typeof b.cantidadBotellas === 'number' &&
          Number.isInteger(b.cantidadBotellas) &&
          b.cantidadBotellas >= 1 &&
          typeof b.nombreVino === 'string' &&
          b.nombreVino.trim().length > 0
        return (
          Array.isArray(v) &&
          v.length >= 2 &&
          v.length <= 6 &&
          v.every(ok)
        )
      },
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    ofertaEtiqueta: {
      type: String,
      default: '',
    },
    priceOferta: {
      type: String,
      default: '',
    },
    agotado: {
      type: Boolean,
      default: false,
    },
  })

  const precioWhatsApp = computed(() =>
    props.priceOferta?.trim() ? props.priceOferta : props.price,
  )

  const whatsappUrl = computed(() =>
    getWhatsAppPackUrl({
      packId: props.packId,
      title: props.title,
      valle: props.valle,
      price: precioWhatsApp.value,
      ofertaEtiqueta: props.priceOferta?.trim() ? props.ofertaEtiqueta?.trim() : '',
      image: props.image,
    }),
  )
  const whatsappReady = computed(() => isWhatsAppConfigured())

  /** Ej. título "N°2 Espumantes/…" → "2" */
  function packNumeroFromTitulo(titulo) {
    if (typeof titulo !== 'string') return ''
    const m = titulo.match(/N[°º\u00B0\u00BA]\s*(\d+)/)
    return m && m[1] ? m[1] : ''
  }

  const waTooltipText = computed(() => {
    if (props.agotado) return 'Este pack está agotado'
    const n = packNumeroFromTitulo(props.title)
    return n ? `Pide el pack ${n} aquí...` : 'Pide tu pack aquí...'
  })

  const whatsappLinkAriaLabel = computed(() => {
    if (props.agotado) return 'Pack agotado, pedido no disponible'
    const n = packNumeroFromTitulo(props.title)
    return n ? `Pedir el pack ${n} por WhatsApp` : 'Pedir pack por WhatsApp'
  })

  let lastWaOpenMs = 0
  function onWaCardClick(e) {
    if (props.agotado) {
      e.preventDefault()
      return
    }
    if (!whatsappReady.value) {
      e.preventDefault()
      return
    }
    const now = Date.now()
    if (now - lastWaOpenMs < 2000) {
      e.preventDefault()
      return
    }
    lastWaOpenMs = now
  }
  
  function etiquetaBotellas(n) {
    if (typeof n !== 'number' || !Number.isFinite(n)) return ''
    const k = Math.floor(n)
    if (k < 1) return ''
    return k === 1 ? '1 bot' : `${k} bot`
  }
  
  function etiquetaCopa(tipo) {
    const m = {
      tinto: 'Vino tinto',
      rosado: 'Vino rosado',
      blanco: 'Vino blanco',
      espumante: 'Espumante',
    }
    return m[tipo] ? `Tipo: ${m[tipo]}` : 'Tipo de copa'
  }
  </script>
  
  <style scoped>
  .card-pack {
    min-height: 0;
    border-radius: 1.125rem;
    overflow: visible;
    --bs-card-inner-border-radius: calc(1.125rem - 1px);
    box-shadow:
      0 10px 32px rgba(0, 0, 0, 0.42),
      0 2px 10px rgba(0, 0, 0, 0.28);
  }
  
  .card-pack-body {
    flex: 1 1 auto;
    min-height: 0;
    padding: 0.65rem 0.7rem 0.75rem;
  }
  
  .card-img-wrap {
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 1.125rem 1.125rem 0 0;
  }

  .card-img-wrap--pack {
    position: relative;
  }

  .card-pack-agotado-badge {
    position: absolute;
    top: 0.55rem;
    left: 50%;
    z-index: 2;
    translate: -50% 0;
    padding: 0.38rem 0.85rem;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #fff;
    background: linear-gradient(145deg, #6a6a6a, #3d3d3d);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 0.4rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

  .card-pack-img--agotado {
    filter: grayscale(1) brightness(0.9);
  }

  .card-pack--agotado .card-title,
  .card-pack--agotado .card-valle,
  .card-pack--agotado .card-bloque {
    opacity: 0.88;
  }
  
  .card-img-top {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
  
  @media (max-width: 575.98px) {
    .card-img-wrap {
      aspect-ratio: unset;
      height: min(72vw, 340px);
    }
  }
  
  .card-heading {
    margin-bottom: 0.35rem;
  }
  
  .card-title {
    font-family: 'Nunito', system-ui, sans-serif;
    overflow-wrap: break-word;
    font-size: clamp(0.82rem, 2.45vw, 1.05rem);
    line-height: 1.2;
    font-weight: 700;
  }
  
  .card-valle {
    font-size: clamp(0.62rem, 1.65vw, 0.78rem);
    line-height: 1.3;
    letter-spacing: 0.02em;
    color: rgba(var(--vin-acento-rgb), 0.82);
    font-weight: 700;
    padding: 0 0.25rem;
    overflow-wrap: break-word;
  }
  
  .card-bloques {
    min-height: 0;
    min-width: 0;
    flex: 1 1 auto;
  }
  
  .card-bloque {
    min-width: 0;
    font-size: clamp(0.66rem, 1.75vw, 0.82rem);
    line-height: 1.22;
    color: #444;
    text-align: left;
  }
  
  .bloque-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    gap: 0.2rem 0.35rem;
    min-width: 0;
    width: 100%;
  }
  
  .bloque-copa {
    flex-shrink: 0;
    display: inline-flex;
    align-items: flex-start;
    padding-top: 0.1rem;
  }
  
  .bloque-botellas {
    flex-shrink: 0;
    white-space: nowrap;
    padding-top: 0.1rem;
  }
  
  .bloque-nombre {
    flex: 1 1 0;
    min-width: 0;
    align-self: stretch;
    display: block;
    text-align: left;
    line-height: 1.35;
    white-space: normal;
    overflow: visible;
    overflow-wrap: break-word;
    word-break: normal;
  }

  @media (max-width: 767.98px) {
    .bloque-grid {
      flex-wrap: wrap;
      align-items: flex-start;
      row-gap: 0.2rem;
    }

    .bloque-nombre {
      flex: 1 1 100%;
      width: 100%;
      text-align: left;
    }
  }
  
  .copa-svg {
    display: block;
  }
  
  .copa-liq--tinto {
    fill: #6d1f2c;
  }
  
  .copa-liq--rosado {
    fill: #c76b7e;
  }
  
  .copa-liq--blanco {
    fill: #e8d9b4;
  }
  
  .copa-liq--espumante {
    fill: #c9a227;
  }
  
  .copa-burbuja {
    fill: rgba(255, 255, 255, 0.78);
  }
  
  .card-bloque-rule {
    border: none;
    border-top: 2px solid var(--vin-acento);
    opacity: 0.85;
    margin: 0.65rem 0;
  }
  
  .card-divider {
    border-color: rgba(var(--vin-acento-rgb), 0.45);
    opacity: 1;
    margin: 0;
    margin-top: 0.5rem;
  }
  
  .card-price-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 2.35rem;
    box-sizing: border-box;
    padding-top: 0.25rem;
    padding-bottom: 0.1rem;
  }

  .card-price-oferta-label {
    font-size: clamp(0.72rem, 1.85vw, 0.82rem);
    line-height: 1.15;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--vin-acento, #6b2d3e);
  }

  .card-price--oferta {
    font-size: clamp(0.95rem, 2.35vw, 1.12rem);
  }

  .card-price--regular {
    font-size: clamp(0.78rem, 1.9vw, 0.88rem);
    line-height: 1.15;
    font-weight: 600;
    opacity: 0.85;
  }
  
  .card-price {
    font-size: clamp(0.88rem, 2.15vw, 1.02rem);
    line-height: 1.2;
    letter-spacing: 0.02em;
    overflow-wrap: break-word;
    font-weight: 700;
  }

  .card-wa-footer {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;
  }

  .card-wa-footer:hover,
  .card-wa-footer:focus-within {
    z-index: 5;
  }

  .card-wa-wrap {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
  }

  .card-wa-btn {
    width: 2.35rem;
    height: 2.35rem;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    flex-shrink: 0;
  }

  .card-wa-icon {
    flex-shrink: 0;
  }

  </style>
  