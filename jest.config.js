module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$', // Busca archivos que terminen con .spec.ts
  transform: {
    '^.+\\.ts$': 'ts-jest', // Usa ts-jest para transformar archivos TypeScript
  },
  coverageDirectory: '../coverage', // Donde se guardará el informe de cobertura
  testEnvironment: 'node', // Entorno de pruebas
};
