# Skill: Catalogo

## Objetivo
Implementar el módulo de catálogo para gestionar categorías y productos en el sistema de ventas.

---

## Dominio

### Categoría
- id
- nombre
- descripcion (opcional)
- estado (activo/inactivo)

### Producto
- id
- nombre
- descripcion (opcional)
- precio
- stock
- categoria_id
- estado (activo/inactivo)

---

## Reglas de negocio

- Un producto pertenece a una categoría
- No se puede crear producto sin categoría
- El precio debe ser mayor a 0
- El stock no puede ser negativo
- Categorías inactivas no deben usarse en nuevos productos
- Los productos pueden desactivarse (no eliminar físicamente)

---

## Backend (Laravel)

### Categorías
- Modelo: Categoria
- Controlador: CategoriaController
- CRUD completo
- Validaciones con FormRequest

### Productos
- Modelo: Producto
- Relación: belongsTo(Categoria)
- Controlador: ProductoController
- CRUD completo
- Validaciones:
  - nombre requerido
  - precio > 0
  - stock >= 0
  - categoria_id válido

### API
- Rutas REST
- Respuestas JSON consistentes
- Manejo de errores estándar

---

## Frontend (React + TypeScript)

### Categorías
- Página de listado
- Crear / editar
- Activar / desactivar

### Productos
- Listado con:
  - filtro por categoría
  - búsqueda por nombre
- Crear / editar
- Selector de categoría (dropdown)
- Validaciones en formulario

---

## Arquitectura Frontend

- Separar lógica en hooks:
  - useCategorias
  - useProductos
- Servicios API:
  - categoriaService
  - productoService
- Componentes reutilizables:
  - Formulario
  - Tabla

---

## UX/UI

- Formularios claros
- Validaciones visibles
- Mensajes de éxito/error
- Listados paginados

---

## Objetivo de implementación

- CRUD completo de categorías
- CRUD completo de productos
- Relación entre ambos funcionando correctamente
- Listado con filtros
