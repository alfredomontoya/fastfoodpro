# AGENTS.md

## Purpose
This repository is a FASTFOOD management system built on Laravel + Inertia + React.
Any coding agent working here should preserve the current layered architecture and extend the project toward a usable point-of-sale system without collapsing business logic into controllers or frontend pages.

## Current Stack
- Backend: PHP 8.3, Laravel 13
- Frontend: Inertia.js, React 18, TypeScript, Vite
- Styling: Tailwind CSS
- Auth foundation: Laravel Breeze
- Testing: PHPUnit
- Routing: Laravel web routes + Inertia pages
- Data access: Eloquent ORM with repositories and services

## Architecture Rules
- Keep the backend flow as: Route -> Controller -> Service -> Repository -> Model.
- Controllers should stay thin.
- Business rules belong in `app/Services`.
- Query composition and persistence belong in `app/Repositories`.
- Validation belongs in `app/Http/Requests`.
- Authorization belongs in Policies, not inline conditionals in controllers or pages.
- Frontend pages should orchestrate UI only. Reusable pieces belong in `resources/js/Components` or `resources/js/hooks`.

## Important Existing Modules
- Authentication:
  - login, register, logout
  - forgot/reset password
  - force password change flow
- Authorization:
  - roles: `ADMIN`, `OPERADOR`
  - policies for categories and products
- Catalog:
  - category CRUD
  - product CRUD
  - search and filtering
  - image upload/removal
- Profile:
  - update profile
  - update password
  - delete account

## Current Domain Model
- `User`
  - fields include `role` and `force_password_change`
- `Category`
  - has many products
  - supports soft deletes
  - optional image
- `Product`
  - belongs to category
  - supports soft deletes
  - includes name, description, price, optional image

## Files and Folders to Respect
- `app/Http/Controllers`: HTTP entry points only
- `app/Http/Requests`: request validation
- `app/Services`: business logic
- `app/Repositories`: data access
- `app/Policies`: role-based permissions
- `app/Models`: Eloquent models and relationships
- `resources/js/Pages`: Inertia pages
- `resources/js/Components`: reusable React components
- `resources/js/hooks`: page/form hooks
- `resources/js/types`: shared TS types
- `database/migrations`: schema history
- `tests/Feature`: feature-level behavior

## Working Conventions
- Prefer extending existing patterns over inventing new ones.
- Reuse the current catalog module structure as the reference for new modules.
- Keep naming consistent in English for code and in Spanish for user-facing labels when matching the current UI.
- Preserve the current visual direction in authenticated pages unless explicitly redesigning.
- Use `route()` and Inertia navigation consistently in the frontend.
- Prefer server-driven data via controllers instead of ad hoc client fetching.

## Do Not Regress
- Do not move business logic into React pages.
- Do not bypass policies with frontend-only role checks.
- Do not mix raw SQL into controllers.
- Do not introduce a second architecture style for new modules.
- Do not remove soft-delete behavior from catalog entities unless explicitly requested.

## Priority Gaps To Implement Next
The project already supports catalog administration. The next business modules should be built in this order unless the user asks otherwise:

1. Sales
- sale header
- sale items
- totals and subtotals
- payment method
- sale confirmation

2. Customers
- customer CRUD
- link customers to sales

3. Cash / Payments
- cash session open/close
- payment records
- daily totals

4. Operational Dashboard
- real KPIs from database
- sales today
- top products
- totals by category

5. User Administration
- list users
- create users by admin
- assign roles
- force password reset/change

## Pattern For New Business Modules
When implementing a new module such as Sales or Customers, create:
- migration(s)
- model(s)
- policy
- request classes
- repository
- service
- controller
- Inertia pages
- reusable form/list components
- feature tests

## Testing Expectations
- Add or update feature tests for each new module.
- Cover authorization by role.
- Cover happy path plus validation failures.
- Cover image/file handling when relevant.
- Keep tests aligned with existing feature-style coverage.

## Notes About Current Project State
- `Dashboard` is currently a strategic placeholder and should evolve into a real operational dashboard.
- `Welcome.tsx` and parts of the default Breeze profile UI still look scaffolded.
- `README.md` is still the default Laravel README and does not describe the actual product yet.

## Agent Behavior
- Before coding, inspect the nearest existing module and mirror its structure.
- Prefer small, safe changes that fit the current architecture.
- When asked for analysis, distinguish clearly between what already exists and what is still missing.
- When adding a feature, leave the project more consistent than before.
