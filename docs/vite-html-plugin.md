# Vite HTML Plugin - Documentación

**Versión:** 1.0  
**Estado:** Activo  
**Fecha:** 2026-03-03

---

## ¿Qué es?

Plugin de Vite que inyecta dinámicamente valores SEO/meta en `index.html` durante la compilación (build-time).

**Ventajas:**
- ✅ Fuente única de verdad: `src/config/seo.ts`
- ✅ Evita duplicación (DRY principle)
- ✅ Sincronización automática (cambios en seo.ts → reflejados en HTML)
- ✅ Build-time injection (sin overhead en runtime)
- ✅ Type-safe (TypeScript)

---

## Arquitectura

```
src/config/seo.ts
    ↓
    Contiene: seoConfig con todos los valores
    ↓
vite.config.ts
    ↓
    Plugin: htmlSeoPlugin()
    ↓
    Lee seo.ts en build-time
    ↓
index.html (plantilla)
    ↓
    Placeholders: %%PLACEHOLDER%%
    ↓
    Plugin reemplaza placeholders
    ↓
dist/index.html (compilado)
    ↓
    Valores reales inyectados
```

---

## Cómo Funciona

### 1. Definir Valores en seo.ts

```typescript
// src/config/seo.ts
export const seoConfig = {
  siteName: "UPP | Unión Papelera",
  description: "...",
  keywords: "...",
  // ... más valores
};
```

### 2. Plugin Lee y Mapea Valores

```typescript
// vite.config.ts
const seoReplacements: Record<string, string> = {
  "%%SEO_DESCRIPTION%%": seoConfig.description,
  "%%SEO_KEYWORDS%%": seoConfig.keywords,
  // ... más mapeos
};
```

### 3. Template Usa Placeholders

```html
<!-- index.html -->
<meta name="description" content="%%SEO_DESCRIPTION%%" />
<meta name="keywords" content="%%SEO_KEYWORDS%%" />
```

### 4. Build Reemplaza

```html
<!-- dist/index.html (generado) -->
<meta name="description" content="Unión Papelera Platense: fabricación..." />
<meta name="keywords" content="papel reciclado, papel onda, ..." />
```

---

## Placeholders Disponibles

| Placeholder | Fuente | Descripción |
|-------------|--------|-------------|
| `%%SEO_DESCRIPTION%%` | seoConfig.description | Meta description (160 chars) |
| `%%SEO_KEYWORDS%%` | seoConfig.keywords | Keywords para SEO |
| `%%SEO_AUTHOR%%` | seoConfig.author | Autor del sitio |
| `%%SEO_PAGE_TITLE%%` | seoConfig.pageTitle | Title tag completo |
| `%%OG_URL%%` | seoConfig.siteUrl | URL canónica |
| `%%OG_TITLE%%` | seoConfig.ogTitle | Open Graph title |
| `%%OG_DESCRIPTION%%` | seoConfig.ogDescription | Open Graph description |
| `%%OG_IMAGE%%` | seoConfig.ogImage | Open Graph image URL |
| `%%OG_TYPE%%` | seoConfig.ogType | Open Graph type |
| `%%OG_LOCALE%%` | seoConfig.language | OpenGraph locale |
| `%%TWITTER_TITLE%%` | seoConfig.twitterTitle | Twitter title |
| `%%TWITTER_DESCRIPTION%%` | seoConfig.twitterDescription | Twitter description |
| `%%TWITTER_CARD%%` | seoConfig.twitterCard | Twitter card type |
| `%%CANONICAL_URL%%` | seoConfig.siteUrl | Canonical URL |
| `%%GEO_PLACENAME%%` | seoConfig.geoPlaceName | Geo place name |
| `%%GEO_REGION%%` | seoConfig.geoRegion | Geo region (p.ej. AR-BA) |
| `%%GEO_POSITION%%` | coordenadas | Geo position (lat;lon) |
| `%%GEO_COORDINATES%%` | coordenadas | Geo coordinates (lat, lon) |
| `%%ORG_NAME%%` | seoConfig.organizationName | Nombre de la organización |
| `%%ORG_ADDRESS_STREET%%` | address.streetAddress | Calle |
| `%%ORG_ADDRESS_LOCALITY%%` | address.locality | Localidad |
| `%%ORG_ADDRESS_REGION%%` | address.region | Región/provincia |
| `%%ORG_ADDRESS_POSTAL%%` | address.postalCode | Código postal |
| `%%ORG_ADDRESS_COUNTRY%%` | address.country | País (AR) |
| `%%ORG_TELEPHONE%%` | seoConfig.telephone | Teléfono |
| `%%ORG_GEO_LAT%%` | seoConfig.geoLatitude | Latitud |
| `%%ORG_GEO_LON%%` | seoConfig.geoLongitude | Longitud |
| `%%BUSINESS_TYPE%%` | seoConfig.businessType | Tipo de negocio (LocalBusiness) |
| `%%ADDITIONAL_TYPE%%` | seoConfig.additionalType | Tipo adicional (ManufacturingBusiness) |
| `%%PRICE_RANGE%%` | seoConfig.priceRange | Rango de precios ($$) |
| `%%KNOWS_ABOUT%%` | seoConfig.knowsAbout | Array JSON de productos/servicios |
| `%%OPENING_HOURS_JSON%%` | seoConfig.operatingHoursI | Array JSON de horarios |

---

## Cómo Agregar un Nuevo Placeholder

### Paso 1: Agregar en seo.ts

```typescript
// src/config/seo.ts
export const seoConfig = {
  // ... existing config ...
  myNewValue: "Mi valor",
};
```

### Paso 2: Mapear en vite.config.ts

```typescript
// vite.config.ts
const seoReplacements: Record<string, string> = {
  // ... existing mappings ...
  "%%MY_NEW_VALUE%%": seoConfig.myNewValue,
};
```

### Paso 3: Usar en index.html

```html
<!-- index.html -->
<meta property="custom:value" content="%%MY_NEW_VALUE%%" />
```

### Paso 4: Compilar y Validar

```bash
npm run build
# Verificar que dist/index.html tiene el valor reemplazado
```

---

## Actualizar Valores SEO

### Cambio Simple (ej. descripción)

1. Editar `src/config/seo.ts`
2. Cambiar valor en `seoConfig.description`
3. Ejecutar `npm run build`
4. ✅ Automáticamente reflejado en dist/index.html

### Cambio de Dirección/Teléfono

```typescript
// src/config/seo.ts
export const seoConfig = {
  // ...
  address: {
    streetAddress: "Calle 508 e/ 16 y 17",  // CAMBIAR AQUÍ
    locality: "Ringuelet",
    region: "La Plata",
    postalCode: "1900",
    country: "AR",
  },
  telephone: "+54 9 11 2693-5682",  // CAMBIAR AQUÍ
};
```

Luego compilar:
```bash
npm run build
```

El schema JSON-LD y todos los meta tags se actualizarán automáticamente.

---

## Agregar nuevo horario

```typescript
// src/config/seo.ts
export const seoConfig = {
  // ...
  operatingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "15:00",
    },
    // Agregar nuevos horarios aquí
    {
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "12:00",
    },
  ],
};
```

El schema JSON-LD se actualizará automáticamente con los nuevos horarios.

---

## Validar Plugin en Desarrollo

```bash
npm run dev
```

En dev server, el plugin también funciona (transforma en memoria). Los cambios en seo.ts se reflejan al recargar la página.

---

## Testing / QA

### Checklist pre-deploy:

- [ ] Validar que `dist/index.html` NO contiene placeholders (%%XXX%%)
- [ ] Verificar meta tags con valores reales:
  ```bash
  grep "description" dist/index.html
  grep "og:title" dist/index.html
  grep "openingHoursSpecification" dist/index.html
  ```
- [ ] Validar JSON-LD schema:
  https://validator.schema.org/ (copiar script del dist/index.html)
- [ ] Validar Open Graph:
  https://ogp.me/#type_website (validador rápido)
- [ ] No hardcodear valores en futuro - siempre usar seo.ts

---

## Solución de Problemas

### Problema: Placeholders no se reemplazan

**Causa:** Plugin no está registrado en vite.config.ts

**Solución:**
```typescript
// vite.config.ts
import { htmlSeoPlugin } from "./path/to/plugin";
export default defineConfig({
  plugins: [vue(), htmlSeoPlugin()],  // ✅ Plugin debe estar aquí
});
```

### Problema: Valores con comillas

**Causa:** Si seoConfig.description contiene comillas, puede romper el HTML

**Solución:** Escapar comillas en seoConfig:
```typescript
description: 'El "mejor" papel...'  // use single quotes
```

O en la función de reemplazo (ya está implementado):
```typescript
transformed = transformed.replace(/%%PLACEHOLDER%%/g, value);
```

### Problema: JSON mal formado en schema

**Causa:** Array o objeto no se stringifica correctamente

**Solución:** Usar `JSON.stringify()` en el mapeo:
```typescript
"%%KNOWS_ABOUT%%": JSON.stringify(seoConfig.knowsAbout),
```

---

## Referencias Futuras

- Plugin registrado en: [vite.config.ts](../vite.config.ts)
- Configuración almacenada en: [src/config/seo.ts](../src/config/seo.ts)
- Template con placeholders: [index.html](../index.html)
- Archivo compilado: [dist/index.html](../dist/index.html)

---

## Ventajas vs Alternativas

| Aspecto | Vite Plugin | .env | Hardcoded |
|--------|-----------|------|-----------|
| **DRY** | ✅ Sí | ⚠️ Parcial | ❌ No |
| **Type-safe** | ✅ Sí | ❌ No | ⚠️ Runtime |
| **Build-time** | ✅ Sí | ⚠️ Runtime | ✅ Sí |
| **Sincronización** | ✅ Auto | ⚠️ Manual | ❌ Manual |
| **Complejidad** | ⚠️ Media | ✅ Baja | ✅ Baja |

---

## Mantenimiento

**Responsable:** [Equipo desarrollo UPP]  
**Revisión:** Cada cambio de valores SEO  
**Testing:** `npm run build` debe completarse sin errores
