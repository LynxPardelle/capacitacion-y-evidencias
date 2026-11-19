# Verificación de la base

Fecha: 2026-11-19.

- 9 pruebas Node de dominio, health, mapeo de ambientes y recorrido HTTP local aprobadas.
- 3 pruebas Angular de carga, fallo/reintento y respuesta inválida aprobadas.
- Build Angular production aprobado. Development y testing definidos por separado.
- Plantilla SAM validada con cfn-lint 1.60.1 sin hallazgos.
- Mapeo development/development, testing/testing y production/main comprobado; stacks separados.
- Dependencias web de producción: auditoría sin hallazgos; los cinco lockfiles resuelven el mismo conjunto de dependencias.
- Código nuevo; sin copiar datos, contenido ni marcas de los repositorios de origen.

GitHub tiene tres rulesets activos sin bypass; testing y main requieren PR, zoo/ci y su check de origen de GitHub Actions (app 15368). Los tres GitHub Environments están restringidos a sus ramas exactas. El despliegue AWS está desactivado. Identidad, persistencia de negocio, alojamiento web y el primer piloto siguen en el plan. Las pruebas puras no acreditan autorización ni transacciones distribuidas.

## Configuración remota confirmada

- integrity: https://github.com/LynxPardelle/capacitacion-y-evidencias/rules/27667623
- testing: https://github.com/LynxPardelle/capacitacion-y-evidencias/rules/27667627
- production: https://github.com/LynxPardelle/capacitacion-y-evidencias/rules/27667632

ENABLE_AWS_DEPLOY=false comprobado como variable del repositorio. Las promociones se registran en el historial de pull requests y sus checks; los merge commits conservan el origen development → testing → main.

## CI ejecutado en GitHub

La ejecución manual https://github.com/LynxPardelle/capacitacion-y-evidencias/actions/runs/44595282016 terminó success sobre fd230192111ec4197ef9c79348ed0cd6a894ba4d. Incluye pruebas Node y Angular, lint SAM y build de producción. No desplegó AWS. Los cambios posteriores son documentación y referencia de configuración.

## Comprobación inicial de bloqueo

Se intentó actualizar development directamente a testing y main mediante la API Git refs. GitHub rechazó ambos intentos con HTTP 422 y Repository rule violations; no cambiaron los carriles protegidos.

El PR de diagnóstico https://github.com/LynxPardelle/capacitacion-y-evidencias/pull/1 fue creado para observar el rechazo development → main. En la preparación inicial no apareció la ejecución; la comprobación posterior sí obtuvo el failure nativo registrado abajo. Se cerró sin fusionar. El estado inicial de disparos pendientes se reemplaza con la recuperación registrada más abajo. Las reglas permanecen activas.

Se configuraron dos políticas explícitas de Actions: promocion.yml sólo permite pull_request_target; ci.yml sólo push, pull_request y workflow_dispatch. Esas políticas y los IDs de rulesets están en .github/settings-reference.json. No se redujeron los checks ni se habilitó bypass.

Ver [diagnóstico de eventos](ACTIONS-EVENTOS.md) para reproducir y presentar evidencia a soporte. La cuenta API está autenticada. La verificación posterior utiliza eventos automáticos genuinos de GitHub, con evidencia por ejecución.

## Recuperación automática verificada

CI por push: https://github.com/LynxPardelle/capacitacion-y-evidencias/actions/runs/44615652982 — success. Gate negativo de procedencia: https://github.com/LynxPardelle/capacitacion-y-evidencias/actions/runs/44615865959 — failure esperado, PR BLOCKED y cerrado sin merge. Se eliminó la sonda temporal; permanecen los workflows de producto, las reglas, la app15368 y cero bypass. Ver [prueba estructurada](actions-proof.json) y [procedimiento de promoción](promocion.md). Las promociones válidas y sus merge SHA se conservan en el historial de PR de GitHub.
