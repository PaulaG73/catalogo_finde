<template>

    <router-view/>
    
    </template>
    
    <style>
    html {
      scroll-behavior: smooth;
    }
    
    #app {
      font-family: 'Nunito', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
    
    nav {
      padding: 30px;
    }
    
    nav a {
      font-weight: bold;
      color: #2c3e50;
    }
    
    nav a.router-link-exact-active {
      color: var(--vin-acento);
    }
    </style>
    