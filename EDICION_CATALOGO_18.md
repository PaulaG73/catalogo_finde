# Edición `catalogo_18` (Fiestas Patrias)

Esta rama / carpeta es la **edición dieciochera** del catálogo Vinóloga.

| Qué | Valor actual |
|-----|----------------|
| Nombre npm (`package.json`) | `catalogo_18` |
| Rama Git recomendada | `catalogo-18` |
| Título del sitio (pestaña) | Catálogo 18 · Vinóloga |
| URL pública | `https://catalogo18.netlify.app` |
| Remoto GitHub | `PaulaG73/catalogo_finde` _(nombre histórico del repo)_ |

## Activar la URL `catalogo18.netlify.app` en Netlify

El código ya apunta a esa URL. En Netlify hay que **cambiar el subdomain** del sitio (o crear uno nuevo):

1. Entra a [app.netlify.com](https://app.netlify.com) → sitio actual (`catalogofinde`).
2. **Site configuration** → **Domain management**.
3. En el dominio `*.netlify.app` → **Options** → **Edit site name**.
4. Pon el nombre **`catalogo18`** (queda `https://catalogo18.netlify.app`).
5. Guarda y vuelve a desplegar (`npm run build` + deploy, o push si tienes CI).

Opcional: deja `catalogofinde.netlify.app` como dominio secundario con redirect 301 a `catalogo18`, para no romper enlaces viejos.

## Cómo volver atrás cuando terminen las fiestas

### URL

En Netlify, vuelve a editar el site name a `catalogofinde` (o el que uses para el catálogo finde) y restaura `VUE_APP_PUBLIC_SITE_URL` / fallbacks a esa URL.

### Código / rama

**Opción A** — `git checkout main` si ahí quedó la edición finde.

**Opción B** — Quitar UI dieciochera, renombrar paquete a `catalogo_finde` y título a `Catálogo Fin de Semana · Vinóloga`.

**Opción C** — Guardar esta edición:

```bash
git tag edicion-18-2026
git push origin catalogo-18
git push origin edicion-18-2026
```
