# Skill: Catalogo Visual (Master-Detail)

## Objetivo
Implementar una interfaz visual tipo maestro-detalle para la gestión de categorías y productos, permitiendo filtrar productos dinámicamente al seleccionar una categoría, con soporte de imágenes y operaciones CRUD desde un mismo módulo.

---

## Alcance

Extiende la skill `Catalogo` existente agregando:

- Visualización en 2 paneles (categorías / productos)
- Filtrado dinámico por categoría
- Soporte de imágenes
- Operaciones CRUD integradas en la misma pantalla

---

## Dominio (Extensión)

### Categoría
- id
- nombre
- descripcion (opcional)
- imagen (opcional)
- estado (activo/inactivo)

### Producto
- id
- nombre
- descripcion (opcional)
- precio
- stock
- imagen (opcional)
- categoria_id
- estado (activo/inactivo)

---

## Reglas de negocio (adicionales)

- Al seleccionar una categoría, se deben mostrar únicamente sus productos
- Si no hay categoría seleccionada, no se muestran productos
- No se deben mostrar productos inactivos por defecto
- Las imágenes son opcionales pero deben soportarse
- Categorías inactivas no deben ser seleccionables
- El cambio de categoría debe refrescar productos automáticamente

---

## Backend (Laravel)

### Productos - Filtro por categoría

Actualizar `ProductoController@index`:

- Permitir filtro por `categoria_id`
- Retornar solo productos activos (por defecto)

---

### Imágenes

- Usar almacenamiento en `storage/app/public`
- Guardar solo la ruta en DB
- Endpoint debe devolver URL accesible

---

### Endpoints adicionales

- Activar / desactivar categoría
- Activar / desactivar producto

---

## Frontend (React + TypeScript)

### Estado principal

- categoriaSeleccionada: number | null

---

## Componentes

### Layout principal

- CatalogoVisualPage
  - PanelCategorias
  - PanelProductos

---

### PanelCategorias

Responsabilidades:

- Listar categorías activas
- Mostrar imagen + nombre
- Permitir selección
- Indicar categoría seleccionada visualmente
- Botón para:
  - Crear
  - Editar
  - Activar / desactivar

---

### PanelProductos

Responsabilidades:

- Mostrar productos filtrados por categoría
- Mostrar imagen, nombre y precio
- Si no hay categoría seleccionada → mostrar mensaje
- Botón para:
  - Crear
  - Editar
  - Activar / desactivar

---

## Hooks

### useCategorias

- Obtener categorías
- Manejar estado local
- CRUD

---

### useProductos

- Aceptar `categoriaId`
- Obtener productos filtrados
- Refetch automático al cambiar categoría
- CRUD

---

## Servicios API

### categoriaService

- getAll
- create
- update
- toggleEstado

---

### productoService

- getAll (con filtro categoria_id)
- create
- update
- toggleEstado

---

## UX/UI

- Grid visual con imágenes
- Categoría seleccionada resaltada
- Scroll independiente en cada panel
- Estados:
  - loading
  - vacío
  - error
- Mensaje:
  - “Seleccione una categoría” si aplica

---

## Flujo principal

1. Cargar categorías
2. Usuario selecciona categoría
3. Se actualiza `categoriaSeleccionada`
4. Se ejecuta `useProductos(categoriaId)`
5. Se renderizan productos filtrados

---

## Objetivo de implementación

- Interacción fluida sin recargar página
- Filtrado en tiempo real
- Experiencia tipo POS
- Código desacoplado (hooks + servicios + UI)

---

## Criterios de aceptación

- Seleccionar categoría filtra productos correctamente
- Productos cambian sin recargar la página
- Se muestran imágenes en ambos paneles
- CRUD funcional sin salir del módulo
- Estados activo/inactivo respetados
- Código organizado según arquitectura definida

---

## Opcionales (nivel avanzado)

- Cache por categoría (optimización)
- Lazy loading de imágenes
- Skeleton loaders
- Uso de React Query o Zustand

---

## Nota de diseño

Este módulo debe comportarse como un catálogo interactivo, no como formularios tradicionales separados.
