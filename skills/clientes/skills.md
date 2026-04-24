# Skill: Cliente

## Objetivo
Implementar la intefaz visual para la gestion de clientes, permitiendo poder filtrar clientes, por nombre o nit_ci, con soporte de imagenes y operaciones crud.

---

## Dominio

### Cliente
- id
- user_id
- nombre
- nit_ci (opcional)
- direccion (opcional)
- telefono (opcional)
- email (opcional)
- estado (activo/inactivo)

---

## Reglas de negocio

- El nit_ci debe ser unico

---

## Backend (Laravel)

### Categorías
- Modelo: Cliente
- Relacion: BelongTo(User)
- Controlador: ClienteController
- CRUD completo
- Validaciones con FormRequest

---

### Imágenes

- Usar almacenamiento en `storage/app/public`
- Guardar solo la ruta en DB
- Endpoint debe devolver URL accesible

---

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
---

## Arquitectura Frontend

- Hooks:
  - useClientes
- Servicios API:
  - clienteService
- Componentes:
  - ClientePage

---

## Objetivo de implementación

- CRUD completo de clientes
- Relación funcionando correctamente
