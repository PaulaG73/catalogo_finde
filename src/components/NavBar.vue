<template>
    <div class="navBar">
      <nav id="navbar-principal" class="navbar navbar-expand-lg navbar-dark bg-vino-profundo border-bottom py-2 py-md-4 nav-vino">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Catálogo Semana Santa</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-2 gap-lg-4 align-items-lg-center">
  
              <li class="nav-item">
                <a class="nav-link" href="#packs">Packs</a>
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
  
  
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .nav-vino {
    border-color: rgba(255, 255, 255, 0.12) !important;
  }
  
  .nav-vino .navbar-brand,
  .nav-vino .nav-link {
    font-family: 'Nunito', system-ui, sans-serif;
    color: rgba(255, 255, 255, 0.92);
  }
  
  .nav-vino .navbar-brand:hover,
  .nav-vino .navbar-brand:focus {
    color: #fff;
  }
  
  /* Hover / foco solo en enlaces del menú (Packs, Contacto) */
  .nav-vino .navbar-nav .nav-link {
    position: relative;
    padding-inline: 0.75rem;
    padding-block: 0.4rem;
    border-radius: 0.4rem;
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
  