# TODO - Pendientes

Este archivo mantiene únicamente tareas pendientes.
Las tareas realizadas fueron movidas a `docs/todo.done.md`.

---

## P1 - Calidad

### SEO

- [x] Implementar meta description en `index.html`
- [x] Agregar Open Graph tags (og:title, og:description, og:image, og:url)
- [x] Crear robots.txt en `public/`
- [x] Crear sitemap.xml en `public/` (landing estática de una sola página)
- [x] Implementar canonical tag en `index.html`
- [x] Reemplazar h2 principal del Hero con h1
- [x] Revisar jerarquía de títulos (h1 → h2 → h3)
- [x] Expandir descripción del negocio en sección Hero
- [x] Implementar schema JSON-LD de LocalBusiness con coordenadas (-34.8295, -57.9956)

### GEO

- [x] Usar coordenadas exactas de planta (-34.8295, -57.9956)
- [x] Agregar horarios de operación (07:00 a 15:00) en schema openingHoursSpecification
- [x] Evaluar Google My Business setup (GMB) para verificación local
  - Guía completa: [docs/gmb-setup.md](./gmb-setup.md)
  - Schema mejorado con `contactPoint`, `priceRange`, `additionalType`
  - Próximo paso: Crear perfil GMB manualmente en https://www.google.com/business/

## P2 - Arquitectura

- [x] Integrar contact info en siteContent.ts (eliminado contact.ts)
- [x] Extraer valores hardcodeados de index.html
  - Creado: src/config/seo.ts (centraliza toda config SEO)
  - Creado: Vite HTML Plugin (inyecta valores automáticamente)
  - Actualizado: index.html con placeholders (%%PLACEHOLDER%%)
  - Actualizado: vite.config.ts con plugin de transformación

## P3 - Tests / DevOps

- Sin pendientes activos.

---

## Referencias

- **Completadas:** [`docs/todo.done.md`](./todo.done.md)
- **Hallazgos:** [`docs/audit.md`](./audit.md)
- **Dudas de arquitectura:** [`docs/dudas-arquitectura.md`](./dudas-arquitectura.md)
