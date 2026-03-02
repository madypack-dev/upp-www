# UPP WWW

Proyecto web de UPP usando Vue + TypeScript + Tailwind, tomando como referencia visual y de contenido el archivo [`example.html`](./example.html).

## Estado

- Fase actual: primera iteración implementada (landing institucional base).
- Documentación base creada:
  - [`AGENTS.md`](./AGENTS.md)
  - [`docs/todo.md`](./docs/todo.md)
  - [`docs/dudas-arquitectura.md`](./docs/dudas-arquitectura.md)

## Objetivo inicial (confirmado)

Construir una landing responsive que replique la experiencia base de `example.html`:

- Header sticky.
- Hero principal.
- Barra de métricas.
- Sección de categorías de productos.
- Sección de logística/ubicación.
- CTA inferior sticky (WhatsApp + llamada).

## Stack implementado

- Vue 3 + TypeScript + Vite
- Tailwind CSS (con tokens visuales equivalentes a la referencia)
- Arquitectura de v1: MVP SPA
- Fuente de contenido v1: estático en código
- Branding v1: temporalmente igual a `example.html`

## Desarrollo local

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```

## Deploy (GitHub Actions + SSH)

El deploy automático está configurado para:

- Ejecutarse solo en `main` (producción).
- Correr después de `CI / Quality` exitoso en `push`.
- Publicar `dist/` por SSH con `rsync`.

### Secrets requeridos

- `DEPLOY_SSH_HOST`
- `DEPLOY_SSH_USER`
- `DEPLOY_SSH_PRIVATE_KEY`
- `DEPLOY_SSH_KNOWN_HOSTS`

### Variables requeridas

- `DEPLOY_REMOTE_DIR`

### Variables opcionales

- `DEPLOY_SSH_PORT` (default: `22`)
- `DEPLOY_HEALTHCHECK_URL` (si se define, el workflow falla si no responde)
