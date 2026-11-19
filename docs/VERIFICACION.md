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

## Bloqueo directo y límite observado

Se intentó actualizar development directamente a testing y main mediante la API Git refs. GitHub rechazó ambos intentos con HTTP 422 y Repository rule violations; no cambiaron los carriles protegidos.

El PR de diagnóstico https://github.com/LynxPardelle/capacitacion-y-evidencias/pull/1 fue creado para observar el rechazo development → main. No apareció la ejecución automática de promoción, por lo que no se atribuye al gate un resultado failure. Se cerró sin fusionar. Las promociones positivas quedan sin comprobar de extremo a extremo mientras falten los disparos automáticos. Las reglas permanecen activas.

Se configuraron dos políticas explícitas de Actions: promocion.yml sólo permite pull_request_target; ci.yml sólo push, pull_request y workflow_dispatch. Esas políticas y los IDs de rulesets están en .github/settings-reference.json. No se redujeron los checks ni se habilitó bypass.

Ver [diagnóstico de eventos](ACTIONS-EVENTOS.md) para reproducir y presentar evidencia a soporte. La cuenta API está autenticada y el navegador disponible se encontraba sin sesión de GitHub; no se completó una comparación de canal autenticado por interfaz.
