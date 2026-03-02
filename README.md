# UPP WWW

Proyecto web de UPP usando Vue + TypeScript + Tailwind, tomando como referencia visual y de contenido una referencia HTML inicial ya migrada al código Vue.

## Estado

- Fase actual: primera iteración implementada (landing institucional base).
- Documentación base creada:
  - [`AGENTS.md`](./AGENTS.md)
  - [`docs/todo.md`](./docs/todo.md)
  - [`docs/dudas-arquitectura.md`](./docs/dudas-arquitectura.md)

## Objetivo inicial (confirmado)

Construir una landing responsive que replique la experiencia base de la referencia inicial:

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
- Branding v1: temporalmente igual a la referencia inicial migrada

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

El deploy está configurado para:

- Ejecutarse automáticamente en `push` a `main` (producción) tras `CI / Quality` exitoso.
- Permitir ejecución manual (`workflow_dispatch`) solo desde `main`.
- Publicar `dist/` por SSH con `rsync`.
- Política operativa v1: deploy directo al `DocumentRoot` de UPP con `rsync --delete` (directorio gestionado por CI/CD).

### Configuración de GitHub (obligatoria)

1. Crear el environment `production` en el repositorio.
2. Cargar secrets y variables en ese environment (recomendado) o a nivel repositorio.

### Secrets requeridos

- `DEPLOY_SSH_HOST`: host/IP del servidor destino SSH (ejemplo: `200.58.103.24`).
- `DEPLOY_SSH_USER`: usuario remoto con permisos de escritura en `DEPLOY_REMOTE_DIR`.
- `DEPLOY_SSH_PRIVATE_KEY`: clave privada OpenSSH del usuario remoto (bloque completo multilínea).
- `DEPLOY_SSH_KNOWN_HOSTS`: entrada de host verificado (`ssh-keyscan -H -p <puerto> <host>`).

### Variables requeridas

- `DEPLOY_REMOTE_DIR`: directorio remoto absoluto donde se sincroniza `dist/` (valor esperado en producción: `/home/papelera/public_html`).
- `DEPLOY_HEALTHCHECK_URL`: URL de verificación post-deploy (valor esperado en producción: `https://unionpapeleraplatense.com.ar/`).

### Variables opcionales

- `DEPLOY_SSH_PORT` (default: `22`).
- `DEPLOY_DEBUG` (`true` o `1`): habilita depuración adicional del deploy (contexto + `rsync --dry-run`).

### Guardrails de producción (workflow)

- El workflow falla si `DEPLOY_REMOTE_DIR` no coincide con `/home/papelera/public_html`.
- El workflow falla si `DEPLOY_HEALTHCHECK_URL` no coincide con `https://unionpapeleraplatense.com.ar/`.
- El deploy siempre ejecuta healthcheck al final.

### Estado operativo confirmado en VPS (2026-03-02)

- `DocumentRoot` del vhost de UPP (`unionpapeleraplatense.com.ar`): `/home/papelera/public_html`.
- `DocumentRoot` de `madygraf.com`: `/home/i6000695/public_html` (sitio WordPress existente).
- `DocumentRoot` por defecto de IP (`http://200.58.103.24/`): `/opt/apache/htdocs` (no usar como target de deploy para UPP).

Incidente registrado:

- Un deploy de prueba cayó en `/opt/apache/htdocs` y fue retirado inmediatamente.
- Backup de rollback: `/root/backup-wrong-upp-deploy-2026-03-02-153419`.
- Variables de `production` corregidas: `DEPLOY_REMOTE_DIR=/home/papelera/public_html` y `DEPLOY_HEALTHCHECK_URL=https://unionpapeleraplatense.com.ar/`.
