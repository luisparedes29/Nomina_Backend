# Backend del sistema de Nómina
#### Producción de software - Universidad Valle del Momboy - 9no trimestre
##  Pasos para poner el servidor en funcionamiento

- Clona este repositorio en tu máquina local
- Navega hasta el directorio del proyecto
- Ejecuta el siguiente comando para instalar las dependencias

```shell
npm install
```

- Verificar que la configuración de la base de datos esté correcta. En el archivo ".env" debe estar la variable "DATABASE_URL" definida correctamente de acuerdo con la configuración de su MySQL instalado en su computadora.
##### IMPORTANTE
-  Asumiendo que su Workbench ya esté configurado y activo. Asegúrese de ejecutar dos comandos de Prisma a continuación para asegurar la migración del modelo de la DB, y así no presente errores cuando vaya a probar los endpoints.
- Primero ejecutará el siguiente comando
```shell
npx prisma migrate dev --name init --create-only
```
- Una vez lo haya ejecutado, si todo salió bien, ya debería ser capaz de ejecutar el siguiente comando.
```shell
npx prisma migrate dev
```
- Una vez aplicado estos dos pasos. Ya la base de datos deberia haberse migrado exitosamente. Por lo que ya puede probar los endpoints.
###### Notas adicionales
>-  Si usted presenta algún error a la hora de aplicar estos comandos, procure tener sus dependencias actualizadas o revise nuevamente la configuración de la BD en el archivo ".env".
>-  Es importante que si se realizan cambios en el modelo de la BD (schema.prisma), usted deba eliminar la carpeta de migrations y volver a aplicar los comandos previamente mencionados. Antes de esto, borre el esquema desde Workbench también para crear uno nuevo con la información actualizada.
