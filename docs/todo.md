# TODO (Certezas)

## Certezas extraídas de la referencia

- El proyecto se implementará con Vue + TypeScript + Tailwind.
- La referencia funcional/visual es `example.html`.
- El contenido de la v1 será estático en código (sin CMS/API).
- Branding temporal de la v1: mantener paleta/estética/assets de `example.html`.
- Las imágenes de hero y categorías se versionan localmente en `src/assets/images`.
- Deploy v1: SSH + `rsync` desde GitHub Actions.
- Deploy automático: solo `main` hacia producción.
- El workflow `CD / SSH` requiere `environment` `production` y variables/secrets de deploy SSH documentados en `README.md`.
- Se incorporó `.env.example` con variables de deploy SSH y `.env` local ignorado por git para configuración operativa.
- El vhost `unionpapeleraplatense.com.ar` publica desde `/home/papelera/public_html`.
- `madygraf.com` publica desde `/home/i6000695/public_html` y contiene WordPress.
- El deploy erróneo en `/opt/apache/htdocs` fue revertido con backup en `/root/backup-wrong-upp-deploy-2026-03-02-153419`.
- Variables de `production` corregidas: `DEPLOY_REMOTE_DIR=/home/papelera/public_html` y `DEPLOY_HEALTHCHECK_URL=https://unionpapeleraplatense.com.ar/`.
- Topología de deploy v1: un único target (producción).
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

1. [x] Inicializar base Vue 3 + TypeScript.
2. [x] Configurar Tailwind con tokens y utilidades equivalentes a la referencia.
3. [x] Definir estructura de componentes por secciones de la landing.
4. [x] Migrar markup y estilos de `example.html` a componentes Vue.
5. [x] Integrar tipografía y sistema de íconos usados en la referencia.
6. [x] Asegurar layout responsive mobile-first y validar desktop.
7. [x] Dejar configuraciones de contacto (WhatsApp/teléfono) en variables centralizadas.
8. [x] Correr validaciones de calidad (build/lint) al cerrar la primera iteración.
9. [x] Definir estrategia de deploy MVP (SSH, `main` -> producción, single target).
