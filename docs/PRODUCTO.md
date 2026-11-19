# Capacitación y Evidencias

El producto permite a una empresa o academia organizar grupos, registrar cursos completados y localizar la evidencia vigente de cada participante. El comprador inicial es la persona que coordina capacitación recurrente en una organización. La propuesta comercial combina alta del catálogo y grupos con una suscripción por organización y participantes activos.

## Recorrido

1. El coordinador crea un curso con revisión, contenido descriptivo y una regla de vigencia en días o sin caducidad.
2. Incorpora un grupo e inscribe a sus participantes con los datos mínimos de identificación.
3. El instructor registra una realización y adjunta una evidencia, que un revisor autorizado acepta o rechaza con motivo.
4. El coordinador consulta vigencias por curso y persona y obtiene un reporte con la revisión y el origen de los registros.

La etiqueta de vigencia es administrativa. Las constancias de esta aplicación documentan registros internos. Las acreditaciones oficiales dependen de los organismos y procesos correspondientes y quedan fuera de las afirmaciones del producto.

## Aceptación del primer flujo de negocio

| ID | Resultado comprobable |
| --- | --- |
| AC-01 | Cada registro está asociado a una organización, participante, curso y revisión del curso. |
| AC-02 | Un instructor solo registra realizaciones de los grupos a los que tiene acceso. La consulta cruzada de organizaciones se rechaza. |
| AC-03 | El revisor puede inspeccionar la versión exacta del archivo antes de aceptarla. Reemplazar el archivo origina otra versión y otra decisión. |
| AC-04 | Una realización con fecha futura queda pendiente. Una revocada pierde la vigencia. La fecha final de vigencia se incluye y el día posterior vence. |
| AC-05 | Una modificación del curso crea una revisión independiente y conserva la política aplicada al registro anterior. |
| AC-06 | Reenviar una carga confirmada conserva un registro y un recibo. El coordinador puede exportar los campos del reporte sin descargar archivos privados de otro grupo. |

## Base implementada

La primera regla pura comprueba curso, revisión, revocación y fechas civiles reales. Las pruebas cubren vencimiento, año bisiesto, evidencia faltante y política inválida. La infraestructura inicial expone la salud del proceso y reserva una tabla y un bucket privados por entorno. La autenticación, los grupos, las cargas, las revisiones y los reportes pertenecen a las siguientes fases.

## Uso de material previo

La idea retoma los conceptos de cursos y usuarios de `student-and-course-administration`. Esta base tiene código nuevo, identificadores ficticios en pruebas y reglas propias del registro de evidencias. El diseño emplea los nombres de negocio que necesita el comprador.
