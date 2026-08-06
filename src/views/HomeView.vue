<template>
  <NavBar />

  <section id="sobre-mi" class="home-section home-section--ink py-3 py-md-4">
    <h3 class="mb-2 mb-md-3 fw-bold">El mundo de Vinóloga</h3>
    <div class="container sobre-mi d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 gap-md-4">
      <div
        ref="sobreMiFotoShellRef"
        class="sobre-mi-foto-shell"
        :class="{ 'sobre-mi-foto-shell--in-view': sobreMiFotoInView }"
      >
        <div class="sobre-mi-foto">
          <img
            class="sobre-mi-foto__img"
            :src="sobreMiFotoSrc"
            alt="Vinóloga"
            loading="lazy"
            decoding="async"
          >
        </div>
      </div>
      <div class="sobre-mi-texto">
        <p class="mb-1 mb-md-2">
          Es tiempo de <span class="sobre-mi-vino-mayus">APRENDER</span>, es tiempo de
          <span class="sobre-mi-vino-mayus">COMPARTIR</span>, es tiempo de
          <span class="sobre-mi-vino-mayus">DISFRUTAR</span>.
        </p>
        <p class="mb-3 mb-md-3">
          Bienvenido al Mundo de Vinóloga...el mundo de los "<span class="sobre-mi-vino-mayus">VINOS CON CUENTO</span>"...
        </p>
        <a
          class="sobre-mi-cta"
          :href="contactoWhatsAppUrl"
          target="_blank"
          rel="noopener noreferrer"
          :aria-disabled="!contactoWhatsAppReady"
          :class="{ 'sobre-mi-cta--disabled': !contactoWhatsAppReady }"
          aria-label="Habla conmigo por WhatsApp"
        >
          <svg
            class="sobre-mi-cta__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span class="sobre-mi-cta__label">Habla conmigo</span>
        </a>
      </div>
    </div>
    <div class="container text-end mt-2">
      <a href="#" class="btn btn-sm btn-outline-success rounded-circle p-1 btn-top" title="Volver al inicio" aria-label="Volver al inicio">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
        </svg>
      </a>
    </div>
  </section>
  <section id="packs" class="home-section home-section--slate pt-4 pt-md-5 pb-2 pb-md-3">
    <div class="container text-center">
      <h3 class="mb-4 fw-bold">Packs fin de semana</h3>
    </div>
    <div
      class="packs-carousel-outer d-flex align-items-center gap-2 gap-sm-3 px-2 px-sm-3"
      @mouseenter="pauseCarousel"
      @mouseleave="resumeCarousel"
      @touchstart.passive="onCarouselTouchStart"
      @touchend.passive="onCarouselTouchEnd"
      @focusin="pauseCarousel"
      @focusout="onCarouselFocusOut"
    >
      <button
        type="button"
        class="packs-carousel-arrow packs-carousel-arrow--prev"
        aria-label="Ver packs anteriores"
        @click="scrollCarousel(-1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <div
        ref="carouselRef"
        class="packs-carousel-wrap flex-grow-1 min-w-0"
        tabindex="0"
        role="region"
        aria-label="Carrusel de packs, desplazamiento horizontal"
      >
        <div class="packs-carousel-inner">
          <div
            v-for="(proyecto, idx) in proyectosLoop"
            :key="`${proyecto.id}-${idx}`"
            class="packs-carousel-slide"
          >
            <CardComponent
              :pack-id="proyecto.id"
              :title="proyecto.title"
              :valle="proyecto.valle"
              :bloques="proyecto.bloques"
              :image="proyecto.image"
              :price="proyecto.price"
              :oferta-etiqueta="proyecto.ofertaEtiqueta || ''"
              :price-oferta="proyecto.priceOferta || ''"
              :agotado="Boolean(proyecto.agotado)"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        class="packs-carousel-arrow packs-carousel-arrow--next"
        aria-label="Ver packs siguientes"
        @click="scrollCarousel(1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
    <div class="container text-end mt-2">
      <a href="#" class="btn btn-sm btn-outline-success rounded-circle p-1 btn-top" title="Volver al inicio" aria-label="Volver al inicio">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
        </svg>
      </a>
    </div>
  </section>

  <div class="prefooter-pitch prefooter-pitch--dark container text-center">
    <span class="prefooter-line">Otros vinos y packs disponibles</span>
    <span class="prefooter-sep" aria-hidden="true">·</span>
    <span class="prefooter-line">Compra desde 1 botella</span>
    <span class="prefooter-sep" aria-hidden="true">·</span>
    <span class="prefooter-line">Empaques de regalo sin costo</span>
    <span class="prefooter-sep" aria-hidden="true">·</span>
    <span class="prefooter-line">Consulta valor de despacho a tu comuna</span>
  </div>

  <div id="contacto">
    <FooterComponent />
  </div>

</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import NavBar from '../components/NavBar'
import FooterComponent from '../components/FooterComponent.vue'
import CardComponent from '../components/CardComponent.vue'
import catalogoPacks from '../data/catalogoPack.json'
import { getWhatsAppHablaConmigoUrl, isWhatsAppConfigured } from '@/config/whatsapp'

/** Foto en `public/img/Vinóloga_IA.jpg` */
const sobreMiFotoSrc = '/img/Vinóloga_IA.jpg'

const contactoWhatsAppReady = computed(() => isWhatsAppConfigured())
const contactoWhatsAppUrl = computed(() => getWhatsAppHablaConmigoUrl())

/** Dos series iguales para bucle de scroll sin salto visible */
const proyectosLoop = computed(() => [...catalogoPacks, ...catalogoPacks])

const carouselRef = ref(null)
const sobreMiFotoShellRef = ref(null)
const sobreMiFotoInView = ref(false)
const carouselPaused = ref(false)
const reduceMotion = ref(false)

let sobreMiFotoObserver = null

/** Píxeles por frame (~60 fps); ~0.3 ≈ 18 px/s */
const SCROLL_STEP = 0.32

/** Ancho del hueco del carrusel (sustituye cqi sin container-type, evita avisos del validador CSS) */
const PACKS_CAROUSEL_IW = '--packs-carousel-iw'

let rafId = 0
let syncCarouselRaf = null
let touchResumeTimer = null
let focusResumeTimer = null
let arrowResumeTimer = null
let carouselResizeObserver = null

function syncCarouselInlineSize() {
  const el = carouselRef.value
  if (!el) return
  const w = el.clientWidth
  if (w > 0) el.style.setProperty(PACKS_CAROUSEL_IW, `${w}px`)
}

/**
 * ResizeObserver + setProperty en el mismo frame puede disparar
 * "ResizeObserver loop completed with undelivered notifications".
 * Se aplaza al siguiente paint (rAF).
 */
function scheduleSyncCarouselInlineSize() {
  if (syncCarouselRaf != null) return
  syncCarouselRaf = requestAnimationFrame(() => {
    syncCarouselRaf = null
    syncCarouselInlineSize()
  })
}

function pauseCarousel() {
  carouselPaused.value = true
}

function resumeCarousel() {
  carouselPaused.value = false
}

function onCarouselTouchStart() {
  pauseCarousel()
  if (touchResumeTimer) {
    clearTimeout(touchResumeTimer)
    touchResumeTimer = null
  }
}

function onCarouselTouchEnd() {
  if (touchResumeTimer) clearTimeout(touchResumeTimer)
  touchResumeTimer = setTimeout(() => {
    carouselPaused.value = false
    touchResumeTimer = null
  }, 2400)
}

function onCarouselFocusOut(ev) {
  const outer = ev.currentTarget
  const next = ev.relatedTarget
  if (next && outer.contains(next)) return
  if (focusResumeTimer) clearTimeout(focusResumeTimer)
  focusResumeTimer = setTimeout(() => {
    carouselPaused.value = false
    focusResumeTimer = null
  }, 400)
}

function scrollCarousel(direction) {
  const el = carouselRef.value
  if (!el) return
  pauseCarousel()
  if (arrowResumeTimer) clearTimeout(arrowResumeTimer)

  const inner = el.querySelector('.packs-carousel-inner')
  const firstSlide = inner?.querySelector('.packs-carousel-slide')
  let delta = el.clientWidth * direction
  if (inner && firstSlide) {
    const gapPx = parseFloat(getComputedStyle(inner).gap) || 0
    const slideW = firstSlide.offsetWidth
    const threeCols = window.matchMedia('(min-width: 768px)').matches
    /* Móvil: un avance = 1 tarjeta + hueco; desktop: el viewport ya encaja 3 enteras */
    if (!threeCols) delta = (slideW + gapPx) * direction
  }

  el.scrollBy({
    left: delta,
    behavior: reduceMotion.value ? 'auto' : 'smooth',
  })
  arrowResumeTimer = setTimeout(() => {
    carouselPaused.value = false
    arrowResumeTimer = null
  }, 3200)
}

function tick() {
  const el = carouselRef.value
  if (el && !carouselPaused.value && !reduceMotion.value) {
    const half = el.scrollWidth / 2
    if (half > 1) {
      el.scrollLeft += SCROLL_STEP
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

function setupSobreMiFotoReveal() {
  if (reduceMotion.value) {
    sobreMiFotoInView.value = true
    return
  }
  const shell = sobreMiFotoShellRef.value
  if (!shell) {
    sobreMiFotoInView.value = true
    return
  }
  if (typeof IntersectionObserver === 'undefined') {
    sobreMiFotoInView.value = true
    return
  }
  sobreMiFotoObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          sobreMiFotoInView.value = true
          sobreMiFotoObserver?.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.22, rootMargin: '0px 0px -8% 0px' },
  )
  sobreMiFotoObserver.observe(shell)
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  setupSobreMiFotoReveal()
  syncCarouselInlineSize()
  const el = carouselRef.value
  if (el && typeof ResizeObserver !== 'undefined') {
    carouselResizeObserver = new ResizeObserver(() => scheduleSyncCarouselInlineSize())
    carouselResizeObserver.observe(el)
  }
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  sobreMiFotoObserver?.disconnect()
  sobreMiFotoObserver = null
  if (syncCarouselRaf != null) {
    cancelAnimationFrame(syncCarouselRaf)
    syncCarouselRaf = null
  }
  carouselResizeObserver?.disconnect()
  carouselResizeObserver = null
  cancelAnimationFrame(rafId)
  if (touchResumeTimer) clearTimeout(touchResumeTimer)
  if (focusResumeTimer) clearTimeout(focusResumeTimer)
  if (arrowResumeTimer) clearTimeout(arrowResumeTimer)
})

</script>

<style scoped>
.home-section {
  background-color: var(--vin-negro-marca);
}

.home-section--ink {
  background-color: var(--vin-negro-marca);
}

.home-section--slate {
  background-color: var(--vin-fondo-packs);
}

.home-divider {
  max-width: min(100%, 960px);
  margin-left: auto;
  margin-right: auto;
  opacity: 0.35;
}

.prefooter-pitch {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  row-gap: 0.45rem;
  column-gap: 0.25rem;
  padding-top: 0.65rem;
  padding-bottom: 1.25rem;
  margin-bottom: 0.35rem;
}

.prefooter-pitch--dark {
  background-color: var(--vin-superficie-oscura);
  border-top: 1px solid var(--vin-borde-sutil);
  border-bottom: 1px solid var(--vin-borde-sutil);
}

.prefooter-line {
  font-size: clamp(0.78rem, 2.1vw, 0.92rem);
  line-height: 1.4;
  color: var(--vin-texto-muted);
}

.prefooter-sep {
  color: var(--vin-acento, #6d2c35);
  font-weight: 800;
  font-size: 1.65em;
  line-height: 1;
  padding-inline: 0.28rem;
  user-select: none;
}

/* Móvil: una línea por texto, sin separadores */
@media (max-width: 575.98px) {
  .prefooter-pitch {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    row-gap: 0.45rem;
    column-gap: 0;
  }

  .prefooter-sep {
    display: none;
  }
}

.home-section h3 {
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: clamp(1.3rem, 4vw, 1.9rem);
  letter-spacing: 0.02em;
  display: inline-block;
  position: relative;
  padding: 0.2em 0.85em 1rem;
  margin-bottom: 0.4rem;
  z-index: 0;
  color: var(--vin-texto-claro);
}

/*
 * Línea tipo viña bajo el título (CSS):
 * ::before = tallo en curva (cuarto de elipse con bordes).
 * ::after  = “hojas” (elipses + box-shadow) y un puntito tipo uva.
 */
.home-section h3::before {
  content: '';
  position: absolute;
  z-index: -1;
  left: 50%;
  bottom: 0.18rem;
  width: clamp(2.35rem, 14vw, 3.15rem);
  height: clamp(1.1rem, 5.5vw, 1.45rem);
  transform: translateX(calc(-50% - 0.12rem)) rotate(-13deg);
  transform-origin: 0 100%;
  border: none;
  border-bottom: 2.5px solid rgba(var(--vin-acento-rgb), 0.88);
  border-left: 2.5px solid rgba(var(--vin-acento-rgb), 0.88);
  border-radius: 0 0 0 100%;
  background: transparent;
  opacity: 0.9;
  pointer-events: none;
}

/* Guiño al arco del logo: franja breve, sin verdes de “viña” */
.home-section h3::after {
  content: '';
  position: absolute;
  z-index: 0;
  left: 50%;
  bottom: 0.12rem;
  width: clamp(2.5rem, 18vw, 3.75rem);
  height: 3px;
  transform: translateX(-50%);
  border-radius: 2px;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    #c9a227 0%,
    #3ddc84 22%,
    #4dabf7 44%,
    #9775fa 66%,
    #f783ac 88%,
    var(--vin-acento) 100%
  );
  opacity: 0.88;
}

@media (prefers-reduced-motion: no-preference) {
  .home-section h3::before {
    animation: homeTituloVinaTallo 5s ease-in-out infinite;
  }

  .home-section h3::after {
    animation: homeTituloVinaHojas 5s ease-in-out infinite;
  }
}

@keyframes homeTituloVinaTallo {
  0%,
  100% {
    transform: translateX(calc(-50% - 0.12rem)) rotate(-13deg);
  }
  50% {
    transform: translateX(calc(-50% - 0.06rem)) rotate(-10deg);
  }
}

@keyframes homeTituloVinaHojas {
  0%,
  100% {
    transform: translateX(-50%) scaleX(1);
    opacity: 0.88;
  }
  50% {
    transform: translateX(-50%) scaleX(1.06);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-section h3::before,
  .home-section h3::after {
    animation: none !important;
  }
}

#sobre-mi .sobre-mi-foto-shell {
  --foto-ancho: min(100%, 13.5rem);
  flex: 0 0 auto;
  width: var(--foto-ancho);
  margin-inline: auto;
  position: relative;
  opacity: 0;
  transform: scale(0.96) translateY(14px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

#sobre-mi .sobre-mi-foto-shell--in-view {
  opacity: 1;
  transform: scale(1) translateY(0);
}

#sobre-mi .sobre-mi-foto {
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 1rem;
  overflow: hidden;
  background-color: var(--vin-negro-marca);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.12),
    0 12px 36px rgba(0, 0, 0, 0.45);
}

@media (min-width: 768px) {
  #sobre-mi .sobre-mi-foto-shell {
    --foto-ancho: 12.5rem;
    margin-inline: 0;
  }
}

.sobre-mi-foto__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

@media (prefers-reduced-motion: reduce) {
  #sobre-mi .sobre-mi-foto-shell {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

#sobre-mi .sobre-mi-texto {
  flex: 0 1 auto;
  min-width: 0;
  max-width: min(100%, 40rem);
  text-align: center;
  line-height: 1.6;
  font-size: clamp(0.85rem, 2.2vw, 0.95rem);
  color: var(--vin-texto-claro);
}

.sobre-mi-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  margin-top: 0.35rem;
  padding: 0.72rem 1.45rem;
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: clamp(0.88rem, 2.1vw, 1rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.2;
  text-decoration: none;
  color: #fff;
  background: linear-gradient(
    145deg,
    rgba(var(--vin-acento-rgb), 0.92),
    rgba(58, 15, 24, 0.95)
  );
  border: 1px solid rgba(228, 179, 188, 0.45);
  border-radius: 999px;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease,
    background 0.22s ease;
}

.sobre-mi-cta:hover,
.sobre-mi-cta:focus-visible {
  color: #fff;
  border-color: rgba(228, 179, 188, 0.85);
  transform: translateY(-2px);
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.24);
  background: linear-gradient(
    145deg,
    rgba(var(--vin-acento-rgb), 1),
    rgba(var(--vin-acento-rgb), 0.78)
  );
}

.sobre-mi-cta:focus-visible {
  outline: 2px solid var(--vin-acento-sobre-negro);
  outline-offset: 3px;
}

.sobre-mi-cta__icon {
  flex-shrink: 0;
  opacity: 0.95;
}

.sobre-mi-cta__label {
  flex-shrink: 0;
}

.sobre-mi-cta--disabled {
  opacity: 0.55;
  pointer-events: none;
  cursor: not-allowed;
}

@media (prefers-reduced-motion: reduce) {
  .sobre-mi-cta {
    transition: none;
  }

  .sobre-mi-cta:hover,
  .sobre-mi-cta:focus-visible {
    transform: none;
  }
}

@media (min-width: 768px) {
  #sobre-mi .sobre-mi {
    justify-content: center;
  }

  #sobre-mi .sobre-mi-texto {
    flex: 1 1 0;
    max-width: 28rem;
  }
}

.sobre-mi-vino-mayus {
  color: var(--vin-acento-sobre-negro);
  font-weight: 700;
}

.highlight {
  color: var(--vin-acento);
  font-style: italic;
  font-weight: bold;
}

.frase-final {
  font-style: italic;
  animation: colorPulse 3s ease-in-out infinite;
}

@keyframes colorPulse {
  0% {
    color: var(--vin-texto-muted);
  }
  50% {
    color: var(--vin-acento);
  }
  100% {
    color: var(--vin-texto-muted);
  }
}

.btn-top {
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.packs-carousel-outer {
  max-width: 100%;
  min-height: 0;
}

.packs-carousel-arrow {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(2.5rem, 8vw, 2.85rem);
  height: clamp(2.5rem, 8vw, 2.85rem);
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: var(--vin-acento);
  color: #fff;
  box-shadow: 0 2px 8px rgba(var(--vin-acento-rgb), 0.35);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.packs-carousel-arrow:hover {
  background-color: var(--vin-acento-hover);
  box-shadow: 0 3px 12px rgba(var(--vin-acento-rgb), 0.45);
}

.packs-carousel-arrow:active {
  background-color: var(--vin-acento-active);
  transform: scale(0.96);
}

.packs-carousel-arrow:focus-visible {
  outline: 2px solid rgba(var(--vin-acento-rgb), 0.55);
  outline-offset: 3px;
}

.packs-carousel-wrap {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--vin-acento-rgb), 0.45) transparent;
  padding-block: 0.25rem 0.75rem;
  outline: none;
}

.packs-carousel-wrap:focus-visible {
  box-shadow: 0 0 0 2px rgba(var(--vin-acento-rgb), 0.35);
  border-radius: 0.35rem;
}

.packs-carousel-wrap::-webkit-scrollbar {
  height: 6px;
}

.packs-carousel-wrap::-webkit-scrollbar-thumb {
  background: rgba(var(--vin-acento-rgb), 0.4);
  border-radius: 4px;
}

.packs-carousel-inner {
  --packs-gap: clamp(0.75rem, 2vw, 1.15rem);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: var(--packs-gap);
  width: max-content;
  min-height: 100%;
}

/*
 * Siempre tarjetas enteras en el viewport: 1 columna en móvil, 3 en md+.
 * --packs-carousel-iw = ancho del área scroll (ResizeObserver).
 */
.packs-carousel-slide {
  flex: 0 0 auto;
  box-sizing: border-box;
  scroll-snap-align: start;
  scroll-snap-stop: normal;
  min-height: 0;
  width: var(--packs-carousel-iw, 100%);
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .packs-carousel-slide {
    width: calc((var(--packs-carousel-iw, 100%) - 2 * var(--packs-gap)) / 3);
  }
}

.packs-carousel-slide > * {
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  align-self: stretch;
}
</style>