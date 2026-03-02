# TODO (Certezas)

## Certezas extraídas de la referencia

- El proyecto se implementará con Vue + TypeScript + Tailwind.
- La referencia funcional/visual es `index.html` (archivo de referencia actual).
- La landing base tiene estas secciones:
  - Header sticky.
  - Hero principal con fondo e información comercial.
  - Barra de métrica de sostenibilidad.
  - Categorías de productos (tarjetas).
  - Bloque de logística/ubicación.
  - CTA inferior sticky (WhatsApp + llamada).
- Tokens visuales detectados:
  - `primary`: `#13ec5b`
  - `background-light`: `#f6f8f6`
  - `background-dark`: `#102216`
  - tipografía principal: `Space Grotesk`
  - efecto visual reutilizable: `glass-effect`

## Plan de ejecución confirmado

1. [ ] Inicializar base Vue 3 + TypeScript.
2. [ ] Configurar Tailwind con tokens y utilidades equivalentes a la referencia.
3. [ ] Definir estructura de componentes por secciones de la landing.
4. [ ] Migrar markup y estilos de `index.html` a componentes Vue.
5. [ ] Integrar tipografía y sistema de íconos usados en la referencia.
6. [ ] Asegurar layout responsive mobile-first y validar desktop.
7. [ ] Dejar configuraciones de contacto (WhatsApp/teléfono) en variables centralizadas.
8. [ ] Correr validaciones de calidad (build/lint) al cerrar la primera iteración.
