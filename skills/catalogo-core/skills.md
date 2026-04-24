# Skill: Catalogo

## Objetivo
Implementar el módulo base de catálogo para gestionar categorías y productos en el sistema de ventas.

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

### API
- Rutas REST
- Respuestas JSON consistentes
- Manejo de errores estándar

---

## Frontend (React + TypeScript)

### Categorías
- Listado
- Crear / editar
- Activar / desactivar

### Productos
- Listado
- Crear / editar
- Filtro por categoría

---

## Arquitectura Frontend

- Hooks:
  - useCategorias
  - useProductos
- Servicios API:
  - categoriaService
  - productoService

---

## Objetivo de implementación

- CRUD completo de categorías
- CRUD completo de productos
- Relación funcionando correctamente
