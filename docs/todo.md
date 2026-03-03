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
- [x] Centralizar contenido EDITABLE en archivo único
  - Creado: `src/config/copy.ts` (single source for all text/CTA)
  - Refactorizado: `src/content/siteContent.ts` (ahora importa desde copy.ts)
  - Documentación: `docs/editable-content-strategy.md` (multi-client guide)
- [x] Extraer valores hardcodeados de index.html
  - Creado: src/config/seo.ts (centraliza toda config SEO)
  - Creado: Vite HTML Plugin (inyecta valores automáticamente)
  - Actualizado: index.html con placeholders (%%PLACEHOLDER%%)
  - Actualizado: vite.config.ts con plugin de transformación
- [x] Aplicar Arquitectura Limpia + SOLID refactorización SEO
  - Domain: `src/domain/seo/` (interfaces + tipos puros)
  - Application: `src/application/seo/` + `src/application/ports/` (casos de uso)
  - Infrastructure: `src/infrastructure/seo/` (implementaciones concretas)
  - Config: `src/config/seo.ts` (orquestación final)
  - Documentación: `docs/clean-architecture-seo.md`
- [x] Aplicar Arquitectura Limpia + SOLID refactorización Content (siteContent.ts)
  - Domain: `src/domain/content/` (interfaces IContentProvider, IContentValidator + tipos por sección)
  - Application: `src/application/content/` + `src/application/ports/` (ContentLoader, SectionResolver, ContentPort)
  - Infrastructure: `src/infrastructure/content/` (StaticContentProvider, ContentValidator)
  - Config: `src/config/content.ts` (DI Container + exports)
  - Composable: `src/composables/useContent.ts` (Vue 3 integration)
  - Documentación: `docs/clean-architecture-content.md`
  - Archivos creados: 9 nuevos + 1 composable, ~820 líneas
  - Beneficios: Extensible a API/DB/FireBase sin modificar componentes

## P3 - Contact / Conversión

### WhatsApp Strategy - ELEGIDA: OPCIÓN A (Manual)

- [x] Estrategia WhatsApp definida: **MANUAL** (Respuesta humana sin automatización)
  - Quién responde: Equipo de UPP (definir persona/turno)
  - Al recibir WhatsApp: Alguien lee y responde manualmente
  - Sin bot, sin webhook, sin CRM automation
  - Ventaja: Simple, sin fricción, control total
  - Riesgo: Sin tracking, sin data, escalabilidad limitada
  - Documentación: [docs/whatsapp-manual-setup.md](./whatsapp-manual-setup.md) (guía completa)
  - Decisión: [docs/whatsapp-decision.md](./whatsapp-decision.md) (análisis + plan B/C/D)

### Tareas P3 (Bajo nivel) - PRÓXIMAS

- [ ] **ESTA SEMANA**: Asignar responsable de WhatsApp (persona o rotación)
- [ ] **ESTA SEMANA**: Definir SLA de respuesta (recomendación: 1 hora laboral)
- [ ] **Esta semana**: Verificar número +5492214502250 existe y funciona
- [ ] **Esta semana**: Testear FloatingAction: Click → abre WhatsApp?
- [ ] **Esta semana**: Guardar templates de respuesta en doc compartido
- [ ] Configurar notificaciones de WhatsApp en teléfono responsable
- [ ] Crear Google Sheet para tracking (fecha | mensaje | respuesta | outcome)
- [ ] Entrenamiento: Cómo responder personalizando templates
- [ ] Monitorear primeros 7 días: Volumen, tiempos, conversión
- [ ] Revisión al mes 1: Decidir si escalar a Opción B

## P4 - Tests / DevOps

- Sin pendientes activos.

## Referencias

- **Completadas:** [`docs/todo.done.md`](./todo.done.md)
- **Hallazgos:** [`docs/audit.md`](./audit.md)
- **Dudas de arquitectura:** [`docs/dudas-arquitectura.md`](./dudas-arquitectura.md)
