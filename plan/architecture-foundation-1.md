---
goal: Establecer la base serverless y el plan de Capacitación y Evidencias
version: '1.0'
date_created: 2026-11-19
last_updated: 2026-11-19
owner: ZooBeriah Systems
status: 'In progress'
tags: [architecture, serverless, product]
---

# Introduction

![Estado en curso](https://img.shields.io/badge/status-in_progress-yellow)

La base local ofrece salud, consola y una regla de dominio verificable. El recorrido comercial está descrito en [docs/PRODUCTO.md](../docs/PRODUCTO.md). Cada fase incorpora una porción observable del producto.

## 1. Requirements & Constraints

- **REQ-001** Exponer salud mediante `GET /api/health` e identificar producto y ambiente.
- **REQ-002** Probar curso y revisión, evidencia faltante, revocación y vigencia civil.
- **SEC-001** Verificar identidad, pertenencia y permiso por recurso antes de habilitar rutas de negocio.
- **CON-001** Promover `development → testing → main` a los ambientes `development`, `testing` y `production`.
- **CON-002** Mantener cuenta, ARN y secretos fuera de los archivos de ambientes.
- **PAT-001** Persistir mutaciones con control de versión y recibo idempotente.
- **REQ-003** Identificar retención, restauración y costes de los recursos conservados.

## 2. Implementation Steps

### Implementation Phase 1

- **GOAL-001** Completar el arranque local, la regla pura y la plantilla validada.

| Task | Description | Completed | Date |
| --- | --- | --- | --- |
| TASK-001 | Implementar `services/domain/course-evidence.mjs` y pruebas con fixtures ficticios. Comprobar los límites de fecha o versión correspondientes. | Sí | 2026-11-19 |
| TASK-002 | Definir SAM en `infra/template.yaml`, ambientes en `infra/environments.json` y configuración separada en `infra/samconfig.toml`. Validar con cfn-lint en us-east-1. | Sí | 2026-11-19 |
| TASK-003 | Documentar producto, arquitectura, retención, diagrama y ADR en `docs/`. | Sí | 2026-11-19 |
| TASK-004 | Integrar salud, comandos locales, consola Angular y comprobaciones de configuración. Ejecutar `npm test`, `npm run check:config`, `npm run test:web` y `npm run build:web`. | Sí | 2026-11-19 |

### Implementation Phase 2

- **GOAL-002** Incorporar identidad y la primera porción de negocio. Depende de la fase 1.

| Task | Description | Completed | Date |
| --- | --- | --- | --- |
| TASK-005 | Añadir Cognito y una lectura protegida de cursos en `services/courses/`. Probar identidad, pertenencia y rechazo cruzado de organizaciones. | Pendiente | — |
| TASK-006 | Implementar grupos e inscripciones en `services/groups/`, con roles de coordinador, instructor y revisor. Validar que el instructor sólo accede a su grupo. | Pendiente | — |
| TASK-007 | Añadir a `web/` catálogo y lista de grupos desde esas rutas. Verificar estados vacío, sin permiso y error recuperable. | Pendiente | — |

### Implementation Phase 3

- **GOAL-003** Completar el flujo piloto y demostrar recuperación. Depende de la fase 2.

| Task | Description | Completed | Date |
| --- | --- | --- | --- |
| TASK-008 | Implementar staging de documentos, verificación de integridad y confirmación idempotente en `services/evidence/`. Guardar versión S3 y decisión del revisor por revisión de registro. | Pendiente | — |
| TASK-009 | Implementar reporte de vigencias y exportación paginada con acceso por grupo en `services/reports/` y `web/`. Completar AC-01 a AC-06 de producto. | Pendiente | — |
| TASK-010 | Ejercitar restauración de tabla y versiones S3 en testing, acordar la retención del piloto y comprobar que una corrección conserva la evidencia de la decisión previa. | Pendiente | — |

## 3. Alternatives

- **ALT-001** Usar un servidor de proceso permanente y una base relacional. Ofrece consultas flexibles y requiere operar y escalar ese proceso.
- **ALT-002** Construir todas las funciones antes de probar un piloto. Vincula la validación comercial a un alcance de mayor tamaño.
- **ALT-003** Orquestar cada comando con Step Functions. Su aportación se evaluará cuando exista una espera, compensación o proceso prolongado.

## 4. Dependencies

- **DEP-001** Node.js 24 para servicios y herramientas y Angular 22.3 con NgRx SignalStore 22.0.1 para la consola.
- **DEP-002** AWS SAM y una identidad AWS seleccionada para comprobar un cambio remoto por ambiente.
- **DEP-003** Cognito y roles de aplicación al incorporar rutas de negocio. Los fixtures del piloto siguen siendo ficticios hasta verificar el aislamiento.

## 5. Files

- **FILE-001** `infra/template.yaml` define la salud y los datos reservados por stack.
- **FILE-002** `services/domain/course-evidence.mjs` calcula el comportamiento de dominio.
- **FILE-003** `docs/architecture/ARCHITECTURE.md` fija fronteras, transacciones, costes y recuperación.
- **FILE-004** `web/` y `services/health/` implementan la superficie de arranque.

## 6. Testing

- **TEST-001** Ejecutar `node --test services/domain/*.test.mjs` con los casos límite reales de la regla.
- **TEST-002** Ejecutar pruebas de salud y de la consola y validar el esquema de ambientes y SAM.
- **TEST-003** Añadir pruebas de permisos entre organizaciones o sesiones, conflictos de versión y repetición de solicitudes antes de publicar la ruta correspondiente.
- **TEST-004** Probar restauración de un fixture en testing y verificar el reporte de recuperación antes del piloto.

## 7. Risks & Assumptions

- **RISK-001** Cambiar la regla de vigencia del curso o el archivo después de revisar requiere conservar la revisión y política originales.
- **RISK-002** Los recursos con retención, el PITR y los logs generan costes mientras existen.
- **ASSUMPTION-001** La primera versión comercial opera con un comprador y un grupo piloto de alcance definido. El modelo de precio se validará con ese comprador.

## 8. Related Specifications / Further Reading

- [Producto y aceptación](../docs/PRODUCTO.md)
- [Arquitectura](../docs/architecture/ARCHITECTURE.md)
- [ADR 0001](../docs/architecture/adr/0001-fundacion-serverless.md)
- [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
