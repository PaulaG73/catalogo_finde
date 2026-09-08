# Edición `catalogo_18` (Fiestas Patrias)

Esta rama / carpeta es la **edición dieciochera** del catálogo Vinóloga.

| Qué | Valor actual |
|-----|----------------|
| Nombre npm (`package.json`) | `catalogo_18` |
| Rama Git recomendada | `catalogo-18` |
| Título del sitio (pestaña) | Catálogo 18 · Vinóloga |
| URL Netlify (producción) | `https://catalogofinde.netlify.app` _(sin cambiar: mismo sitio)_ |
| Remoto GitHub | `PaulaG73/catalogo_finde` _(nombre histórico del repo)_ |

## Cómo volver atrás cuando terminen las fiestas

### Opción A — Volver a la rama base (rápido)

Si `main` quedó como edición “finde” sin lo dieciochero:

```bash
git checkout main
```

Si la carpeta local se llama `catalogo_18`, puedes renombrarla de nuevo a `catalogo_finde` y reabrir el proyecto en Cursor.

### Opción B — Quitar solo lo dieciochero y renombrar el paquete

1. En `package.json` / `package-lock.json`: `"name": "catalogo_finde"`.
2. En `vue.config.js`: título `Catálogo Fin de Semana · Vinóloga`.
3. Quitar o desactivar UI 18 (según quieras conservar packs/precios):
   - Nav **Promos dieciocheras** y filtro `soloOfertas`
   - Sellos bandera / precios oferta dieciochera en JSON
   - Paya, sombrero huasa, franja Chile bajo títulos
4. Commit en `main` (o nueva rama `catalogo-finde`).

### Opción C — Guardar esta edición para el próximo 18

```bash
git tag edicion-18-2026
git push origin catalogo-18
git push origin edicion-18-2026
```

Así puedes recuperar este look el próximo septiembre.

## Qué NO hace falta cambiar para “renombrar el proyecto”

- La URL pública de Netlify (salvo que crees un sitio nuevo `catalogo18.netlify.app`).
- El nombre del repositorio en GitHub (opcional y aparte).
