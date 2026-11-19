# ADR 0001 — Base serverless de Capacitación y Evidencias

- **Fecha** 2026-11-19
- **Estado** aceptado para la base local
- **Decisión** dominio puro y recursos separados por producto y ambiente

La formación recurrente requiere relacionar participantes, revisiones de cursos, realizaciones y adjuntos privados. Las reglas de fecha deben poder probarse sin depender de servicios externos.

Elegimos reglas puras, DynamoDB bajo demanda para relaciones y recibos transaccionales y S3 versionado para documentos. Cognito y la autorización de cada grupo se incorporan a la siguiente porción. La revisión de curso guarda la política de vigencia utilizada.

Una base relacional facilitaría reportes ad hoc y relaciones. La tabla por claves exige diseñar consultas por organización y grupo y generar reportes de forma paginada. Esta base favorece un primer flujo acotado con un único propietario de los datos.

La porción desplegable actual contiene salud pública y recursos de datos reservados. Los servicios de negocio deberán incorporar identidad y permisos al añadir sus rutas. El flujo de promoción enlaza `development → testing → main` con ambientes aislados. Los datos usan retención explícita y PITR, con costes que continúan tras eliminar el stack.

[Arquitectura](../ARCHITECTURE.md) · [Plan](../../../plan/architecture-foundation-1.md)
