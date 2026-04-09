<template>
    <div class="card card-pack h-100 d-flex flex-column shadow-sm border-success">
      <div class="card-img-wrap flex-shrink-0">
        <img :src="image" class="card-img-top" :alt="`${title}. ${valle}`" loading="lazy">
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
          <p class="card-price mb-0 fw-bold text-success text-center">{{ price }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
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
  })
  
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
    overflow: hidden;
    --bs-card-inner-border-radius: calc(1.125rem - 1px);
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
  }
  
  .bloque-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.2rem 0.35rem;
    min-width: 0;
    width: 100%;
  }
  
  .bloque-copa {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
  }
  
  .bloque-botellas {
    flex-shrink: 0;
    white-space: nowrap;
  }
  
  .bloque-nombre {
    flex: 1 1 auto;
    min-width: 0;
    text-align: left;
    line-height: 1.25;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    padding-bottom: 0.15rem;
  }
  
  .card-price {
    font-size: clamp(0.88rem, 2.15vw, 1.02rem);
    line-height: 1.2;
    letter-spacing: 0.02em;
    overflow-wrap: break-word;
    font-weight: 700;
  }
  </style>
  