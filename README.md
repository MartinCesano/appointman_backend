<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

# Appointman-Backend

Este repositorio forma parte del proyecto de desarrollo de software para la cátedra de Desarrollo de Software 2024 de la UTN-FRVM.

## Descripción

users-api es el backend para la gestión de usuarios del proyecto. Está desarrollado con NestJS y utiliza JWT para la autenticación y TypeORM para la gestión de la base de datos SQLite.

## Funcionalidades principales

- Gestión de usuarios mediante endpoints RESTful.
- Autenticación con JWT y encriptación de contraseñas con bcrypt.
- Integración con TypeORM para la persistencia de datos.

## Instalación y configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/matiaspresuttari/TP-DS-Usuarios-Back.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución

### En entorno de desarrollo

1. Ejecuta el servidor en modo desarrollo:
   ```bash
   npm run start:dev
   ```

### Pruebas de integración (e2e) con Jest

1. Ejecuta las pruebas de integración:
   ```bash
   npm run test:e2e
   ```

### Pruebas E2E con Cypress

1. **Instala Cypress** (si aún no está instalado):
   ```bash
   npm install cypress --save-dev
   ```

2. **Configura Cypress** (si es necesario, ajusta el archivo `cypress.config.js` según tus necesidades).

3. **Ejecuta Cypress**:
   - Para abrir la interfaz gráfica de Cypress y ejecutar las pruebas:
     ```bash
     npm run cypress:open
     ```
   - Para ejecutar las pruebas en modo headless:
     ```bash
     npm run cypress:run
     ```

## Scripts adicionales

- **Format**: Formatea el código fuente.
  ```bash
  npm run format
  ```
- **Lint**: Ejecuta el linter para verificar el código.
  ```bash
  npm run lint
  ```
- **Build**: Compila el proyecto para producción.
  ```bash
  npm run build
  ```
- **Start**: Inicia el servidor en modo producción.
  ```bash
  npm run start:prod
  ```

## Contribuciones

Si deseas contribuir a este proyecto, por favor, realiza un fork del repositorio y envía un pull request con tus cambios. Asegúrate de seguir las normas de estilo del proyecto y de incluir pruebas adecuadas para tus modificaciones.

## Licencia

Este proyecto está licenciado bajo la Licencia ISC. Consulta el archivo `LICENSE` para obtener más detalles.

```

Guarda este texto en un archivo con extensión `.md` para tener el README completo.