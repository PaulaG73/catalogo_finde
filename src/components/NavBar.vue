<template>
  <div class="navBar">
    <nav id="navbar-principal" class="navbar navbar-expand-lg navbar-dark bg-vin-negro border-bottom py-2 py-md-4 nav-vino">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center gap-2" href="#">
          <span class="navbar-brand-text">En modo Fiestas Patrias</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-2 gap-lg-4 align-items-lg-center">
            <li class="nav-item">
              <a
                class="nav-link"
                href="#packs"
                @click="onVerTodosPacks"
              >Packs</a>
            </li>
            <li class="nav-item">
              <button
                type="button"
                class="nav-link nav-link--ofertas"
                :class="{ 'nav-link--ofertas-active': soloOfertas }"
                :aria-pressed="soloOfertas"
                aria-label="Ver promos dieciocheras"
                @click="onVerOfertas"
              >
                Promos dieciocheras
              </button>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contacto">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  soloOfertas: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['ver-ofertas', 'ver-todos-packs'])

function collapseNavIfOpen() {
  const el = document.getElementById('navbarSupportedContent')
  if (!el || !el.classList.contains('show')) return
  const Collapse = window.bootstrap?.Collapse
  if (Collapse) {
    Collapse.getOrCreateInstance(el, { toggle: false }).hide()
  } else {
    el.classList.remove('show')
  }
}

function onVerOfertas() {
  emit('ver-ofertas')
  collapseNavIfOpen()
}

function onVerTodosPacks() {
  emit('ver-todos-packs')
  collapseNavIfOpen()
}
</script>

<style scoped>
.nav-vino {
  border-color: var(--vin-borde-sutil) !important;
  box-shadow: 0 1px 0 0 rgba(109, 44, 53, 0.35);
}

.nav-vino .navbar-brand,
.nav-vino .nav-link {
  font-family: 'Nunito', system-ui, sans-serif;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
}

.nav-vino .navbar-brand:hover,
.nav-vino .navbar-brand:focus {
  color: #fff;
}

.nav-vino .navbar-nav .nav-link {
  position: relative;
  padding-inline: 0.75rem;
  padding-block: 0.4rem;
  border-radius: 0.4rem;
  border: 0;
  background: transparent;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.nav-vino .navbar-nav .nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0.15rem;
  width: 0;
  height: 2px;
  border-radius: 2px;
  background-color: var(--vin-acento, #6d2c35);
  transform: translateX(-50%);
  transition: width 0.28s ease;
}

.nav-vino .navbar-nav .nav-link:hover,
.nav-vino .navbar-nav .nav-link:focus-visible {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-vino .navbar-nav .nav-link:hover::after,
.nav-vino .navbar-nav .nav-link:focus-visible::after {
  width: calc(100% - 1.1rem);
}

.nav-vino .navbar-nav .nav-link--ofertas {
  color: #f5e6c8;
  background: linear-gradient(145deg, #7a2f45, #4a1c2c);
  border: 1px solid rgba(245, 217, 168, 0.45);
  box-shadow: 0 2px 10px rgba(74, 28, 44, 0.4);
  white-space: nowrap;
}

.nav-vino .navbar-nav .nav-link--ofertas::after {
  display: none;
}

.nav-vino .navbar-nav .nav-link--ofertas:hover,
.nav-vino .navbar-nav .nav-link--ofertas:focus-visible {
  color: #fff8e8;
  background: linear-gradient(145deg, #8f3a52, #5c2436);
  border-color: rgba(245, 217, 168, 0.7);
  transform: translateY(-2px);
}

.nav-vino .navbar-nav .nav-link--ofertas-active {
  color: #fff8e8;
  outline: 2px solid rgba(245, 217, 168, 0.65);
  outline-offset: 2px;
}

@media (max-width: 991.98px) {
  .nav-vino .navbar-nav .nav-link--ofertas {
    white-space: normal;
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-vino .navbar-nav .nav-link {
    transition: color 0.15s ease, background-color 0.15s ease;
  }

  .nav-vino .navbar-nav .nav-link:hover,
  .nav-vino .navbar-nav .nav-link:focus-visible {
    transform: none;
  }

  .nav-vino .navbar-nav .nav-link::after {
    transition: width 0.15s ease;
  }
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.35);
}

.nav-vino .navbar-brand {
  font-size: 1.3rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

@media (min-width: 992px) {
  .nav-vino .navbar-brand {
    font-size: 1.5rem;
  }
}

@media (min-width: 1200px) {
  .nav-vino .navbar-brand {
    font-size: 1.68rem;
  }
}
</style>
