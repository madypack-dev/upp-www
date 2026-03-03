# Google My Business (GMB) - Guía de Configuración para UPP

**Fecha:** 2026-03-03  
**Estado:** Pendiente - Requiere acción manual en Google My Business

---

## ¿Qué es Google My Business (GMB)?

Google My Business es la herramienta oficial de Google que permite a las empresas:
- Aparecer en Google Maps y Google Search
- Controlar cómo se ve la información de negocio en Google
- Interactuar con clientes (reseñas, mensajes, fotos)
- Acceder a insights sobre cómo clientes encuentran el negocio

### Beneficios para UPP

1. **Visibilidad local:** Aparición en búsquedas como "papel reciclado La Plata" o "papel onda industria"
2. **NAP consistency:** Google valida que Name, Address, Phone sean consistentes en toda la web
3. **Trust signals:** Perfil verificado aumenta credibilidad B2B
4. **Local Pack:** Posicionamiento en el "local pack" de Google Search (top 3 negocios locales)
5. **Insights:** Datos sobre clientes (de dónde vienen, qué buscan, llamadas recibidas)

---

## Información de NAP (Name, Address, Phone) - UPP

**CRÍTICO:** Debe ser consistente en GMB, el sitio web y todas las plataformas.

| Campo | Valor |
|-------|-------|
| **Nombre exacto** | Unión Papelera Platense |
| **Dirección** | Calle 508 e/ 16 y 17, Ringuelet, La Plata, B7035, Argentina |
| **Código postal** | 1900 |
| **Teléfono** | +54 9 11 2693-5682 |
| **Coordenadas** | -34.8295, -57.9956 |
| **Horarios** | Lunes a Viernes 07:00 a 15:00 (UTC-3) |
| **Sitio web** | https://upp.ar/ |
| **Tipo de negocio** | Manufacturing Business (Fabricación) / Wholesale Supplier |

---

## Pasos para Crear/Verificar Perfil en GMB

### 1. Acceder a Google My Business

1. Ir a **https://www.google.com/business/**
2. Hacer clic en **"Comienza ahora"** o iniciar sesión con cuenta de Google
3. Recomendación: Usar cuenta corporativa (si existe) o crear una específica para UPP

### 2. Agregar el Negocio

**Formulario inicial:**

```
- Nombre: Unión Papelera Platense
- Actividad: Fabricante de papel / Mayorista de papel
- Ubicación: Calle 508 e/ 16 y 17, Ringuelet, La Plata
- País: Argentina
```

**Seleccionar categoría:**
- Principal: **Paper Manufacturing** o **Wholesale Supplier**
- Secundarias (opcional): Industrial Supply, Recycling Center

### 3. Verificar el Negocio

Google requiere verificación de propiedad. Opciones disponibles:

| Método | Tiempo | Dificultad | Ideal para UPP |
|--------|--------|-----------|---|
| **Postal (correo)** | 7-14 días | Baja | ✅ Sí (dirección conocida) |
| **Teléfono** | Inmediato | Muy baja | ✅ Sí (rápido) |
| **Email** | Inmediato | Muy baja | ✅ Sí |
| **Presencial** | 1-3 días | Media | Sí (si acceso a local) |
| **Sitio Web (HTML)** | Inmediato | Alta | ⚠️ Solo si equipo técnico |

**Recomendación:** Usar verificación por teléfono o correo (más rápido).

### 4. Completar Información del Perfil

**OBLIGATORIO:**
- ✅ Nombre del negocio
- ✅ Dirección y coordenadas
- ✅ Teléfono
- ✅ Sitio web: https://upp.ar/
- ✅ Horarios de operación
- ✅ Categoría principal

**RECOMENDADO:**
- Descripción: "Fabricamos papel onda e higiene 100% reciclado para industria B2B. Especialistas en soluciones sostenibles con venta directa de fábrica."
- Foto de la empresa / Instalaciones
- Foto del equipo/planta
- Atributos: B2B, Mayorista, Entrega disponible

**OPCIONAL:**
- Mensaje de bienvenida personalizado
- Enlace a catálogo de productos
- Preguntas frecuentes

### 5. Vincular el Sitio Web

En GMB → Configuración → Información:

```
Sitio web: https://upp.ar/
```

Google verificará que el dominio es propiedad de UPP. Alternativas:
- Añadir verificación HTML en [index.html](../index.html)
- Usar Google Search Console conectado a la misma cuenta

---

## Verificación de NAP Consistency

### Dónde debe aparecer la información de UPP:

| Plataforma | Status | Detalles |
|-----------|--------|---------|
| **Google My Business** | ⏳ Pendiente | Crear perfil |
| **Sitio web (upp.ar)** | ✅ Activo | [LocationSection.vue](../src/components/LocationSection.vue) + schema JSON-LD |
| **Schema JSON-LD** | ✅ Activo | [index.html](../index.html) |
| **Meta geo tags** | ✅ Activo | [index.html](../index.html) |
| **Redes sociales** | ❓ Pendiente | LinkedIn, Instagram (si aplica) |
| **Directorios B2B** | ❓ Pendiente | Alibaba, TradeKey, etc. |

### Auditoría de NAP

Ejecutar antes de publicar GMB:

1. Verificar que toda dirección sea idéntica en:
   - GMB
   - Sitio web
   - Schema
   - Redes sociales
   
2. Validar teléfono:
   - Formato consistente: `+54 9 11 2693-5682`
   - Operativo y answered durante horarios publicados
   
3. Verificar coordenadas:
   - Google Maps debe apuntar exactamente a la planta
   - Test: https://google.com/maps?q=-34.8295,-57.9956

---

## Configuración Post-Verificación

### Medidas de Seguridad

1. **Restringir acceso al perfil GMB:**
   - Agregar solo usuarios autorizados
   - Configurar permisos (admin, editor, viewer)
   
2. **Habilitar notificaciones:**
   - Reseñas nuevas
   - Cambios de información (requiere aprobación)
   - Mensajes de clientes

3. **Cambios futuros:**
   - Cualquier cambio en GMB requiere reverificación
   - Sincronizar cambios con sitio web inmediatamente

### Moderación de Reseñas

- Responder a todas las reseñas (positivas y negativas) dentro de 24-48h
- Tone profesional, enfocado en relaciones B2B
- Ejemplo de respuesta a reseña positiva:
  ```
  Gracias por confiar en UPP. Nos complace ser tu proveedor de papel 
  reciclado de calidad. Esperamos seguir siendo tu socio en sustentabilidad.
  ```

---

## Mejores Prácticas para UPP

### ✅ Hacer

- Mantener horarios precisos (07:00-15:00 L-V)
- Actualizar fotos regularmente (instalaciones, productos)
- Responder inquiries y mensajes rápidamente
- Usar palabras clave en descripción: "papel reciclado", "B2B", "industrial"
- Publicar actualizaciones sobre nuevos productos o promociones
- Vincular con sitio web y schema

### ❌ NO Hacer

- Cambiar dirección sin verificación
- Usar dirección de depósito vs. oficina sin claridad
- Ignorar reseñas o mensajes
- Publicar información inconsistente con el sitio web
- Usar múltiples perfiles para el mismo negocio
- Spam de ofertas (reduce credibilidad)

---

## Impacto Esperado (después de 30-90 días)

| Métrica | Esperado | Timeline |
|---------|----------|----------|
| **Aparición en Maps** | Sí | 1-7 días |
| **Posicionamiento Local** | Top 10 búsquedas B2B | 30-90 días |
| **Insights disponibles** | Sí | 1-2 semanas |
| **Aumento de tráfico** | +10-20% (estimado) | 60-90 días |

---

## Checklist de Implementación

- [ ] Crear cuenta Google My Business
- [ ] Verificar propiedad del negocio (teléfono/correo)
- [ ] Completar información: nombre, dirección, teléfono, horarios
- [ ] Agregar foto de empresa/instalaciones
- [ ] Vincular sitio web: https://upp.ar/
- [ ] Verificar que NAP es consistente con sitio web
- [ ] Validar coordenadas en GMB Maps
- [ ] Completar descripción del negocio
- [ ] Configurar categorías principales y secundarias
- [ ] Habilitar mensajes y reseñas
- [ ] Monitorear insights mensualmente
- [ ] Responder reseñas y inquiries regularmente

---

## Referencias y Recursos

- [Google My Business Help Center](https://support.google.com/business/)
- [LocalBusiness Schema Validator](https://validator.schema.org/)
- [Google Search Central - Local Business](https://developers.google.com/search/docs/appearance/local-business)
- [NAP Consistency Guide](https://placebaby.com/nap-consistency/)

---

## Próximos Pasos

1. **Acción inmediata:** Crear perfil GMB usando instrucciones arriba
2. **Documentar:** Guardar credenciales en lugar seguro (1Password, Vault, etc.)
3. **Sincronizar:** Después de verificar, actualizar cualquier inconsistencia con sitio web
4. **Monitor:** Revisar insights y reseñas mensualmente

**Responsable:** [Definir equipo UPP]  
**Target:** [Definir fecha límite para GMB verificado]
