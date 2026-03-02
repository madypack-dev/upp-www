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
