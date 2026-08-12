# App de Trazabilidad de Gastos — Requerimientos

## Vista: Puntos de acceso rápido

5 formas de abrir el modal sin entrar a la app:

- Notificación persistente (foreground service): Una notificación fija en la barra que nunca desaparece, con botones o input rápido
- Widget de pantalla de inicio: Un widget que pones en tu home screen con un botón 'Agregar gasto' que abre un modal mínimo
- Quick Settings Tile: Un ícono en el panel de ajustes rápidos (donde está WiFi, Bluetooth) que abre el modal directo

---

## Vista: Modal de registro

- [ ] Toggle **Gasto / Ingreso**
- [ ] Toggle **Modo IA / Modo Directo**
  - Modo IA: input de texto libre → se manda al backend → devuelve monto + categoría
  - Modo IA se **deshabilita sin internet**, cae a Modo Directo
  - Modo Directo: input de monto + combo box de categoría
- [ ] Switch **¿Factura?** (Sí/No) — visible en modo Gasto (directo o IA)
- [ ] Sección **colapsable opcional**: campo de nota/descripción libre
- [ ] Botones **Guardar** / **Cancelar**
- [ ] Al guardar, si el backend detecta que se excedió la proyección (de categoría y/o de su sección de ahorro) → **segundo modal informativo** ("te pasaste por X monto"). Solo aviso, nunca bloquea el registro (gasto o ingreso).

---

## Vista: Dashboard / Home

- [ ] Gasto de la semana
- [ ] Gasto del mes
- [ ] Ingreso del mes
- [ ] Balance del mes (ingreso − gasto)
- [ ] Ahorro real por sección (según secciones de ahorro configuradas)
- [ ] Progreso por sección de ahorro (barra %, ej. cuánto llevas gastado de tus 1500 soles en "básicos")
- [ ] Comparativa vs. mes anterior
- [ ] **[Interno/futuro]** Meta manual del mes: usuario declara "quiero ahorrar X" o "quiero gastar máx. Y", sistema calcula avance en tiempo real contra esa meta

---

## Vista: Configuración

Estructura de sub-vistas dentro de Configuración:

### Configuración → Categorías de gastos

- [ ] Crear, editar y borrar categorías de gasto. Cantidad ilimitada.

### Configuración → Proyecciones de gastos por categoría

- [ ] **Granularidad libre por categoría**: día, semana, mes y/o año. El usuario decide cuáles configura; se requiere **al menos uno**.
- [ ] **Auto-cálculo entre niveles (default)**: si solo configuras un nivel, los demás se derivan por división/multiplicación simple (mes → año ×12, mes → semana ÷4, semana → día ÷7). El cálculo respeta la cantidad real de días de cada mes.
- [ ] **El nivel más granular que el usuario haya tocado manda siempre**: si configuras días específicos, semana/mes/año se recalculan sumando esos días — sobreescribe cualquier valor superior definido antes.
- [ ] **Recurrencia por defecto**: un monto configurado para "lunes" aplica a todos los lunes futuros.
- [ ] **Excepciones puntuales**: se puede sobreescribir un día/semana específico sin romper el patrón recurrente general.
- [ ] **Categorías sin desglose fino** (ej. Universidad = solo nivel mes): el gasto se suma directo al acumulado mensual, sin evaluar día/semana.
- [ ] **Validación informativa, nunca bloqueante**: puede saltar en varios niveles a la vez si la categoría tiene varios configurados.

### Configuración → Categorías de ingresos

- [ ] Crear, editar y borrar categorías de ingreso. Cantidad ilimitada.

### Configuración → Proyecciones de ingresos por categoría

- [ ] Misma lógica y reglas que "Proyecciones de gastos", aplicada a ingresos.

### Configuración → Secciones de ahorro

- [ ] Crear, editar y borrar secciones de ahorro, según una regla activa:
  - 50/30/20
  - 70/20/10
  - Personalizada (N grupos con % propio)
  - Sin regla (default)
- [ ] Cada sección consume un % del **ingreso mensual** (ej. ingreso 3000 → 50%=1500, 30%=900, 20%=600)
- [ ] Cada **categoría de gasto pertenece a UNA sola sección** (ej. Alimentación/Pasaje/Vivienda/Universidad → sección 50%; Salidas/Cine/Restaurante → sección 30%; Ahorro/Inversiones → sección 20%)
- [ ] Cada sección genera su propio aviso de "te pasaste" si el gasto acumulado de sus categorías supera el tope calculado de la sección

### Configuración → Seguridad

- [ ] PIN o biometría (`expo-local-authentication`)
- [ ] Editar cuenta de usuario
- [ ] Borrar cuenta de usuario
- [ ] MFA
- [ ] Cambio de contraseña
- [ ] Auth vía **Better Auth** (incluye login con Google, etc.)

### Configuración → Sincronización de datos

- [ ] Ver registros pendientes de sincronizar (los guardados offline, para confirmar el push manual/automático a Sheets/Notion)
- [ ] Elegir qué hoja de Google Sheets o página de Notion se sincroniza con la app
- [ ] Ingresar tokens de Google Sheets y Notion

### Configuración → Cuenta de usuario

- [ ] Cambiar nombre de usuario
- [ ] Cambiar foto de perfil
- [ ] Cambiar correo electrónico
- [ ] Cambiar datos personales (país, ciudad, dirección, teléfono)
- [ ] cambiar moneda en cualquier momento (solo cambia texto/símbolo mostrado, sin conversión real)

---

## Vista: Onboarding (primera vez que se abre la app)

- [ ] Selección de país
- [ ] Selección de moneda (default: Soles)
- [ ] Creación de cuenta de usuario (vía Better Auth)

---

## Comportamiento: Offline / Sync

- [ ] Todo registro se guarda primero en **SQLite local** (backup instantáneo del dispositivo)
- [ ] Sin internet → solo Modo Directo disponible, queda marcado `pendiente_sync`
- [ ] Con internet → sync automático hacia el backend (**PostgreSQL** como base de datos real) y hacia los espejos (Sheets, Notion)
- [ ] SQLite local es la fuente de verdad para **registros nuevos aún no sincronizados**; una vez sincronizados, PostgreSQL pasa a ser la referencia y Sheets/Notion quedan como espejos de lectura/respaldo
