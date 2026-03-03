# WhatsApp Manual Setup - Guía Implementación

**Estado:** Decisión elegida: **OPCIÓN A - MANUAL**
**Efectivo desde:** Marzo 3, 2026
**Responsable:** Equipo UPP (definir)
**Última actualización:** 2026-03-03

---

## 1. Resumen Ejecutivo

**¿Qué es?**
Alguien del equipo UPP lee mensajes de WhatsApp manualmente y responde sin automatización.

**¿Por qué?**
- MVP: Empezar simple, sin infraestructura
- Control: Respuestas personalizadas, no templatos
- Datos: Aprender qué preguntan los clientes
- Costo: $0/mes
- Setup: 30 minutos

**¿Riesgos?**
- Sin SLA explícito → cliente espera respuesta
- Sin logs → no hay data si persona se va
- Manual copying/pasting → errores
- Escalabilidad: Si crece a 50+ mensajes/día, falla

---

## 2. Flujo de Conversión

```
Visitante ve landing
    ↓
Hace clic en FloatingAction (WhatsApp)
    ↓
Abre WhatsApp con número UPP pre-formateado
    ↓
Escribe mensaje: "Hola, quiero info de..."
    ↓
ALGUIEN DEL EQUIPO recibe en su teléfono
    ↓
Lee mensaje
    ↓
Responde manualmente (sin bot)
    ↓
Conversa directamente con cliente
    ↓
Venta ✓ O No interés
```

---

## 3. Checklist: Implementación Rápida

### 3.1 Configuración Técnica (15 min)

- [ ] **Verificar número WhatsApp**
  - Ubicación: `src/config/contact.ts` → `whatsappNumber`
  - Valor actual: `+5492214502250` (verificar si existe/es válido)
  - Formato: `+55922145022500` (con código país)
  - Testear: Escanea QR de tu landing → debería abrir WhatsApp

- [ ] **Verificar enlace pre-formateado en floating action**
  - Ubicación: `src/components/FloatingActions.vue`
  - URL pattern: `https://wa.me/5492214502250?text=Hola%20UPP`
  - Testear en mobile: Click → abre WhatsApp?

- [ ] **Opcional: Setup WhatsApp Business** (para logo/perfil profesional)
  - Descarga app: "WhatsApp Business" (iOS/Android)
  - Usa mismo número
  - Benefit: Horarios, auto-resposta (opcional), estadísticas in-app
  - Time: 10 min
  - Cost: $0
  - NOT required: App normal funciona igual

### 3.2 Organización Interna (15 min)

- [ ] **Definir persona responsable**
  - Quién monitorea WhatsApp?
  - Quién responde si está occupado?
  - Crear rotación si es necesario

- [ ] **Establecer SLA (Service Level Agreement)**
  - Tiempo máximo de respuesta: ej. 1 hora laboral
  - Horario de atención: ej. Lun-Vie 07:00-15:00 (horarios operacionales)
  - Out-of-hours: Auto-respuesta manual o ignorar?

- [ ] **Crear templates de respuestas**
  - Ver sección 3.3 abajo
  - Guardar en documento compartido (Drive/Notion/etc)
  - Entrenar al equipo

- [ ] **Setup notificaciones en teléfono**
  - Habilitar soundAlert para chats con UPP
  - Para no perder mensajes

### 3.3 Templates de Respuestas

**Template 1: Inicio - Confirmación Recibido**
```
Hola 👋,

Gracias por contactarnos. Recibimos tu mensaje y 
alguien del equipo te responderá dentro de 1 hora.

UPP - Soluciones Sustentables
```

**Template 2: Consulta Técnica de Producto**
```
Excelente pregunta 🎯

Te paso algunos detalles sobre [PRODUCTO]:
• Feature 1: [descripción]
• Feature 2: [descripción]
• Precio: A partir de $[precio]

¿Hay algo específico que necesites?
```

**Template 3: Consulta de Horarios/Ubicación**
```
📍 Ubicación: [dirección]
🕐 Horarios: Lun-Vie 07:00 a 15:00 (UTC-3)

¿Necesitas algo más?
```

**Template 4: Consulta de Presupuesto/Cotización**
```
Me encantaría darte una cotización personalizada 💡

Para hacer esto necesito algunos datos:
• Cantidad de unidades
• Plazo de entrega requerido
• Especificaciones técnicas

¿Cuándo podemos hacer una llamada?
```

**Template 5: Cierre/Siguiente paso**
```
Perfecto 🚀

Te propongo:
1. Llamada para detalles (martes 15:00 UTC-3)
2. Enviar presupuesto formal al email
3. Firma de contrato

¿Cuál te va mejor?
```

**Template 6: Follow-up (si no responden)**
```
Hola de nuevo 👋

Solo checking-in: ¿Todavía estás interesado en [PRODUCTO]?
Si necesitas más info, acá estoy.

Saludos,
UPP
```

---

## 4. Mejores Prácticas (Lean)

### 4.1 Para no perder leads

1. **Responde RÁPIDO**
   - Tiempo = dinero en conversión
   - Meta: <30 min en horario laboral
   - Si no puedes, envía template "Confirmación recibido"

2. **Sé personalizado**
   - No copypastear sin leer
   - Lee la pregunta real del cliente
   - Responde específicamente

3. **Agendar follow-up**
   - No terminar con "Nos escribes"
   - Proponer: Llamada, zoom, video chat
   - Dar opciones de horario

4. **Guardar info importante**
   - Para aprender qué preguntan
   - Futuro: Servirá para entrenar un bot (si escalas)

### 4.2 Para no colapsar

**Si recibís 3+ mensajes/día:**
- Turnarse con otro compañero
- Crear grupos de respuesta (si es equipo)
- Considerar: Quizás es hora de Option B (Auto-response)

**Si recibís 10+ mensajes/día:**
- ALERTA: Opción A no escala
- Plan: Migrar a Option C (Full CRM con Zapier)
- Tiempo: ~16 horas

---

## 5. Métricas a Trackear Manualmente

Aunque sin bot, puedes medir:

| Métrica | Cómo medir | Frecuencia |
|---------|-----------|-----------|
| **Mensajes/mes** | Contar en WhatsApp | Mensual |
| **Tiempo respuesta** | Timestamp inicio → respuesta | Por mensaje |
| **Tasa conversión** | Cuántos dicen "Sí" → venta | Mensual |
| **Tipo pregunta** | Categorizar (producto/precio/horario/otro) | Por mensaje |
| **Persona respondió** | Quién respondió | Por mensaje |

**Herramienta:** Google Sheet simple (no necesitas nada sofisticado)

```
[Fecha] [Mensaje recibido] [Respondedor] [Min respuesta] [Outcome]
3/3/26  "Cuánto cuesta?" John           12              Lead caliente
```

---

## 6. Plan de Escalabilidad (Futuro)

### Cuando escales:

**Mes 1-3 (MVP):**
- Opción A: Manual (AQUÍ ESTÁS)
- Volumen esperado: 5-15 mensajes/semana
- Responsable: 1 persona

**Mes 4 (Si va bien):**
- Monitorear: Cuántos leads convierten?
- Si >30% conversión → Opción B (Auto-response + Email)
- Si <10% conversión → Revisar copy/oferta, no es WhatsApp el problema

**Mes 6 (Si crece):**
- Si 50+ mensajes/mes → Opción B o C
- Opción B: WhatsApp + auto-reply + email sequence (4h, $30/mes)
- Opción C: Full CRM (16h, $100-300/mes)

---

## 7. Troubleshooting

**Problema:** Visitante hace clic pero no abre WhatsApp
- CaUSA: No instalada app o número inválido
- Solución: Verificar `src/config/contact.ts` → whatsappNumber
- Testear: `https://wa.me/5492214502250?text=test`

**Problema:** Alguien se va del equipo y perdemos mensajes
- Causa: Dependencia en persona, sin logs
- Solución: Migrar a WhatsApp Business (app + perfil compartido)
- O: Usar Zapier (Option B) para guardar en cloud

**Problema:** Respondemos lento, cliente se cansa
- Causa: SLA muy rígido o persona está occupada
- Solución: Agregar rotación o implementar auto-respuesta simple

**Problema:** Mismo mensaje copiado a 5 clientes, se nota templaton
- Causa: Templates demasiado rígidos
- Solución: Templates como "estructura", pero personalizar cada respuesta

---

## 8. Próximos Pasos

### Inmediato (esta semana):
1. ✅ Verificar número WhatsApp es válido y funciona
2. ✅ Testear enlace pre-formateado en mobile
3. ✅ Asignar persona responsable
4. ✅ Definir SLA (ej: 1 hora)
5. ✅ Guardar templates en documento compartido

### Esta semana (si van bien):
6. Correr anuncio o compartir landing
7. Recibir primeros mensajes
8. Medir: Cuántas conversiones?

### Próximo mes:
9. Revisar métricas
10. Decidir: ¿Escalar a Opción B si crece?

---

## 9. Apéndice: Config de Referencia

**Archivo de contacto:**
```typescript
// src/config/contact.ts
whatsappNumber: "+5492214502250"  // Argentina, Berisso
whatsappMessage: "Hola, me interesa saber más sobre..."
```

**Componente FloatingAction:**
```vue
<!-- src/components/FloatingActions.vue -->
<a :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`"
   target="_blank">
  💬 WhatsApp
</a>
```

**Para debuggear:**
```
1. Abre DevTools (F12)
2. Ve a Components → FloatingActions
3. Verifica: whatsappNumber, whatsappMessage
4. Click y verifica URL en el navegador
```

---

## 10. FAQ

**P: ¿Puedo usar WhatsApp Web en lugar de app?**
R: Sí, pero teléfono recibe notificaciones mejor. Si quieres escalable, usa WhatsApp Business.

**P: ¿Cómo evito que se pierdan mensajes si cambio de teléfono?**
R: Migra a WhatsApp Business (crea perfil empresa) o usa Zapier (Opción B).

**P: ¿Puedo integrar CRM luego sin cambiar landing?**
R: Sí, el enlace `wa.me` es estándar. Solo cambias cómo UPP procesa los mensajes (backend).

**P: ¿Necesito teléfono dedicado para UPP?**
R: Recomendado. Si es personal, al menos crea chat grupal interno para logs.

**P: ¿Qué pasa si cambio el número en el futuro?**
R: Edita `src/config/contact.ts` y rebuild landing. Takes 30 sec.

---

## 11. Resumen para el Equipo

**Opción elegida:** WhatsApp Manual (Opción A)

**Setup requerido:** 30 minutos
**Costo:** $0/mes
**Responsable:** [NOMBRE A DEFINIR]
**SLA de respuesta:** 1 hora (laboral)

**¿Qué sucede?**
1. Visitante: Click on WhatsApp button
2. Abre WhatsApp con número UPP
3. Escribe mensaje
4. [RESPONSABLE] recibe en teléfono
5. Lee y responde manualmente
6. Conversación directa
7. Venta o No interés

**Métricas a medir:**
- Cantidad de mensajes/semana
- Tiempo promedio de respuesta
- Conversión: Cuántos leads → clientes
- Tipos de preguntas más frecuentes

**Cuándo escalar:**
- Si >50 mensajes/mes: Considerar Opción B (auto-response)
- Si relación conversión es muy baja: Revisar copy, no es WhatsApp

---

**Documento creado:** 2026-03-03
**Próxima revisión:** 2026-04-03 (después de 1 mes de datos)
