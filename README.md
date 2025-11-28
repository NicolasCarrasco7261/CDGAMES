# CDGames

## Descripción del proyecto
CDGames es una aplicación fullstack de comercio electrónico con la que podemos vender videojuegos nuevos y de segunda mano.
El siguiente módulo es el backend del sistema, que se desarrolló utilizando Spring Boot cuya función principal es la persistencia de datos, la lógica de negocio y la exposición de servicios REST consumidos por la parte frontend. Además, en esta tercera etapa se integraron mecanismos de seguridad, autenticación, autorización, carrito de compras y generación de boletas, cumpliendo con los requerimientos establecidos por la rúbrica academica.

El sistema permite:
-         Cliente: 
1.Autenticación mediante JWT
2.Agregar productos al carrito
3.Modificar cantidades o eliminar items
4.Vaciar carrito
5.Finalizar compra
6.Generar boleta automáticamente (neto, IVA y total)
7.Consultar historial personal de compras

-       Administrador
1.CRUD completo de productos
2.CRUD de categorías
3.Gestión de usuarios
4.Desactivación de productos
5.Visualización de todas las boletas del sistema
6.Acceso a endpoints protegidos por rol

-   Funcionalidades generales del backend
1.Persistencia en base de datos MySQL a través de JPA/Hibernate
2.Generación de tablas y carga de datos iniciales vía data.sql
3.Controladores REST limpios y estructurados
4.Documentación automática de endpoints con Swagger UI
## Tecnologías utilizadas
El proyecto backend desarrollado para CDGames se creó utilizando un conjunto amplio de tecnologías modernas que permiten obtener un rendimiento elevado, mantenibilidad, facilidad de desarrollo, etc. A continuación se especifican las principales herramientas, frameworks y librerías usadas para la implementación del proyecto:
Java 21.
Spring Boot 3.5.7.
Spring Data JPA.
Spring Web.
Spring Validation.
Spring Boot DevTools.
MySQL 8.0.
Hibernate ORM.
Lombok.
Swagger/Springdoc OpenAPI 2.6.0.
Maven.
JUnit 5/Mockito.

NOTA: Debe tener toda esta lista previa de herramientas, frameworks y librerias ya instaladas.
## Instrucciones de instalación
Para poder ejecutar el proyecto completo CDGames, es muy necesario preparar el entorno de desarrollo instalando las herramientas necesarias. En los siguientes pasos se explicitan los pasos a seguir para poder instalar y tener el proyecto funcionando en tu equipo local:

1.- Descargue el código fuente completo desde el repositorio oficial de GitHub proporcionado por el equipo del proyecto.

2.- Verifique si tiene las siguientes dependencias / programas instalados en su computadora:
-Java 21 (necesario para poder ejecutar Spring Boot)
-XAMPP Control Panel, para inicio de los servicios de Apache y de MySQL
-MySQL Workbench en versión 8.0 o superior para la gestión de la base de datos
-Visual Studio Code

Una vez completados estos pasos, habrás preparado el entorno necesario para ejecutar correctamente el proyecto CDGames. Este proceso garantiza que todas las herramientas necesarias se encuentren preparadas y ejecutadas antes de comenzar a conectar con la base de datos y tener el proyecto completamente funcional.

## Instrucciones de ejecución
Antes de ejecutar el proyecto asegúrate de tener instalado correctamente el software XAMPP, el software MySQL Workbench y el entorno de desarrollo acorde a Spring Boot (por ejemplo, Visual Studio Code). A continuación se exponen los pasos que debes seguir para ejecutar el backend de CDGames con total normalidad:

1.- Iniciar los servicios para la base de datos: Procede a abrir el XAMPP Control Panel y activar los módulos Apache y MySQL.

2.- Configurar la base de datos: Abre el MySQL Workbench, crea una nueva conexión la cual se denominará cdgames; posteriormente ejecuta el siguiente comando SQL:

CREATE DATABASE cdgames;

El backend se encargará de generar las tablas automáticamente y las poblará con la información inicial definida en el archivo seed que es el (data.sql). La carga inicial se realiza desde: src/main/resources/data.sql

3.- Ejecutar el backend: Abre el proyecto en Visual Studio Code, busca la clase principal CdgamesBackendApplication y haz click en el Run Application para ejecutar la aplicación.

4.-Comprobar la documentación del API: Una vez ejecutada la aplicación, corre los tests del proyecto para habilitar la documentación generada por Swagger. Desde el siguiente link puedes acceder a ella:
http://localhost:8080/swagger-ui.html

Siguiendo estos pasos, el backend para CDGames estará en marcha y listo para la integración con el frontend (que se ejecutará posteriormente). Gracias a su configuración automatizada y a su documentación integrada, el entorno simplificará el desarrollo y la prueba de los servicios REST del sistema.

ADEVERTENCIA: Previo a esto debes tener el backend clonado desde el repositorio de GitHub:
-Link GIt Hub: NicolasCarrasco7261/CDGAMES

## Credencial de prueba
Rol: ADMINISTRADOR
Correo: carc.lopez@cdgames.cl
Contraseña: admin123

Rol: Cliente
Correo: juan.perez@cdgames.cl
Contraseña: admin123

Advertencia: Las contraseñas de la base de datos (archivo seed: data.sql) está cifrada utilizando BCrypt, pero la expuesta aquí es la que debes utilizar para realizar las pruebas (el backend la encripta automáticamente).

## Instrucciones para FrontEnd

- Abrir la consola con ctrl + ñ
- Entrar en el directorio del backend con cd CDGAMES
- Ejecutar el comando npm run dev
- Copiar el link http://localhost:5173/ y pegarlo en el navegador web

## Librerías usadas en FrontEnd (Proyecto React)

React Bootstrap

Para instalar esta libreria de React, debe ejecutar el siguiente comando en la consola:

- npm install react-bootstrap bootstrap

React Router DOM

Para instalar esta libreria de React, debe ejecutar el siguiente comando en la consola:

- npm install react-router-dom

SweetAlert2 (libreria opcional)

Para instalar esta libreria, debe ejecutar el siguiente comando en la consola:

- npm install sweetalert2

Testing React con Jest.

npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

vitest

npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

## Conclusión
- La semilla de SQL se está ejecutando correctamente.  
- El CRUD de productos, usuarios y categorías se encuentra en funcionamiento.  
- La documentación de Swagger está correcta.
- Se han recibido los resultados positivos de las pruebas unitarias.  
- Se cumple la mayoría de la rubrica académica entregada por el profesor.

Nota: Es importante destacar que no puede eliminar una categoría si existen productos relacionados a ella. En caso de que se intente hacer ello, el método mostrará un error. Se trata de una restricción que se impone por motivos de seguridad para prevenir la pérdida total del inventario de productos asociados a dicha categoría en concreto.

## VIDEO DE PRESENTACION (LINK DE YOUTUBE)

https://youtu.be/X0hjLtdWUvA
