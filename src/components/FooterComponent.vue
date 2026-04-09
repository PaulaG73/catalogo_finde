<template>
    <footer class="footer py-2 py-md-4 mt-auto bg-vino-profundo border-top footer-vino">
      <div class="container d-flex align-items-center flex-wrap gap-2">
  
        <!-- Botón volver al inicio (izquierda, ancho fijo) -->
        <div class="footer-side">
          <span class="footer-home-wrap">
            <button
              type="button"
              class="footer-home-btn footer-action-btn"
              aria-label="Volver arriba a la barra de navegación"
              @click="irAlInicio"
            >
              <svg
                class="footer-action-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"
                />
              </svg>
            </button>
            <span class="footer-home-tooltip" role="tooltip" aria-hidden="true">Volver arriba</span>
          </span>
        </div>
  
        <!-- Iconos sociales + copyright (centro) -->
        <div class="flex-grow-1 d-flex flex-column align-items-center gap-2">
          <div class="d-flex align-items-center gap-3">
  
            <!-- WhatsApp -->
            <span class="footer-wa-wrap">
              <a
                class="btn btn-whatsapp rounded-circle p-2 footer-action-btn shadow-sm"
                :href="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                :aria-disabled="!whatsappReady"
                :class="{ 'opacity-50': !whatsappReady }"
                :title="whatsappReady ? undefined : 'Configura WHATSAPP_NUMBER_DIGITS en FooterComponent.vue'"
                aria-label="Haz tu pedido aquí, abrir WhatsApp"
              >
                <svg class="footer-action-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <span class="footer-wa-tooltip" role="tooltip" aria-hidden="true">Haz tu pedido aquí</span>
            </span>
  
          </div>
          <p class="mb-0 footer-copy">Derechos reservados &copy; 2026 Paula Gajardo Schmidlin</p>
        </div>
  
        <!-- Espacio equilibrante (derecha, mismo ancho que izquierda) -->
        <div class="footer-side"></div>
  
      </div>
    </footer>
  </template>
  
  <script setup>
  import { computed, nextTick } from 'vue'
  import { useRouter } from 'vue-router'
  
  // ========== RELLENA AQUÍ ==========
  /** Solo dígitos: código de país + número (sin + ni espacios). Ej. Chile: 56912345678 */
  const WHATSAPP_NUMBER_DIGITS = '56996450950'
  // ===================================
  
  const whatsappReady = computed(() => WHATSAPP_NUMBER_DIGITS.replace(/\D/g, '').length > 0)
  
  const whatsappUrl = computed(() => {
    const digits = WHATSAPP_NUMBER_DIGITS.replace(/\D/g, '')
    if (!digits) return '#'
    return `https://wa.me/${digits}`
  })
  
  const router = useRouter()
  
  async function irAlInicio() {
    if (router.currentRoute.value.name !== 'home') {
      await router.push({ name: 'home' })
      await nextTick()
      await nextTick()
    }
    const nav = document.getElementById('navbar-principal')
    if (nav) {
      nav.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  </script>
  
  <style scoped>
  .footer-vino {
    border-color: rgba(255, 255, 255, 0.12) !important;
  }
  
  .footer {
    color: rgba(255, 255, 255, 0.9);
  }
  
  .footer-home-btn {
    background: none;
    border: none;
    padding: 0.25rem;
    color: rgba(255, 255, 255, 0.92);
    border-radius: 0.25rem;
    transition: color 0.15s ease, opacity 0.15s ease;
  }
  
  .footer-home-btn:hover {
    color: #fff;
    opacity: 0.95;
  }
  
  .footer-home-btn:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.7);
    outline-offset: 3px;
  }
  
  .footer-home-wrap {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
  }
  
  .footer-home-tooltip {
    position: absolute;
    left: calc(100% + 10px);
    top: 50%;
    translate: -6px -50%;
    padding: 0.45rem 0.85rem;
    background: #fff;
    color: var(--vin-profundo, #3a0f18);
    font-family: 'Nunito', system-ui, sans-serif;
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1.25;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.75rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    z-index: 20;
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease,
      translate 0.2s ease;
  }
  
  .footer-home-tooltip::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 100%;
    translate: 2px -50%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px 8px 7px 0;
    border-color: transparent #fff transparent transparent;
    filter: drop-shadow(-2px 0 3px rgba(0, 0, 0, 0.12));
  }
  
  .footer-home-wrap:hover .footer-home-tooltip,
  .footer-home-wrap:focus-within .footer-home-tooltip {
    opacity: 1;
    visibility: visible;
    translate: 0 -50%;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .footer-home-tooltip {
      transition: none;
      translate: 0 -50%;
    }
  }
  
  .footer-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
  
  .footer-wa-wrap {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
  }
  
  .footer-wa-tooltip {
    position: absolute;
    left: calc(100% + 10px);
    top: 50%;
    translate: -6px -50%;
    padding: 0.4rem 0.75rem;
    background: #fff;
    color: var(--vin-profundo, #3a0f18);
    font-family: 'Nunito', system-ui, sans-serif;
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1.25;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.4rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    z-index: 20;
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease,
      translate 0.2s ease;
  }
  
  /* Punta hacia la izquierda (hacia el ícono) */
  .footer-wa-tooltip::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 100%;
    translate: 2px -50%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px 8px 7px 0;
    border-color: transparent #fff transparent transparent;
    filter: drop-shadow(-2px 0 3px rgba(0, 0, 0, 0.12));
  }
  
  .footer-wa-wrap:hover .footer-wa-tooltip,
  .footer-wa-wrap:focus-within .footer-wa-tooltip {
    opacity: 1;
    visibility: visible;
    translate: 0 -50%;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .footer-wa-tooltip {
      transition: none;
      translate: 0 -50%;
    }
  }
  
  .footer-action-icon {
    flex-shrink: 0;
  }
  
  .footer-copy {
    font-size: 0.85rem;
    text-align: center;
  }
  
  .footer-side {
    width: 2rem;
    flex-shrink: 0;
  }
  
  @media (max-width: 400px) {
    .footer-side:last-child {
      display: none;
    }
  }
  </style>
  